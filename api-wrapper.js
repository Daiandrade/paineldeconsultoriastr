// ===== API WRAPPER - Adicione este arquivo ANTES do app.js no index.html =====
// ===== Este arquivo intercepta as chamadas localStorage e usa a API =====

const API_URL = window.location.origin + '/api';
let authToken = localStorage.getItem('authToken');

// Função para fazer requisições autenticadas
async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            window.location.reload();
            throw new Error('Sessão expirada');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro na requisição');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Override do localStorage para usar a API
const originalLocalStorage = {
    getItem: localStorage.getItem.bind(localStorage),
    setItem: localStorage.setItem.bind(localStorage),
    removeItem: localStorage.removeItem.bind(localStorage)
};

// Cache em memória para dados da API
const apiCache = {
    users: null,
    consultores: null,
    produtos: null,
    temas: null,
    roadmap: null,
    agendas: null
};

// Função para carregar todos os dados da API
async function loadAllData() {
    try {
        const [consultores, produtos, temas, roadmap, agendas] = await Promise.all([
            apiRequest('/consultores'),
            apiRequest('/produtos'),
            apiRequest('/temas'),
            apiRequest('/roadmap'),
            apiRequest('/agendas')
        ]);

        apiCache.consultores = consultores;
        apiCache.produtos = produtos;
        apiCache.temas = temas;
        apiCache.roadmap = roadmap;
        apiCache.agendas = agendas;

        console.log('✅ Dados carregados da API');
    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
    }
}

// Interceptar localStorage.getItem
Storage.prototype.getItem = function(key) {
    // Autenticação continua no localStorage
    if (key === 'authToken' || key === 'currentUser') {
        return originalLocalStorage.getItem(key);
    }

    // Dados vêm do cache da API
    if (apiCache[key]) {
        return JSON.stringify(apiCache[key]);
    }

    return originalLocalStorage.getItem(key);
};

// Interceptar localStorage.setItem para salvar na API
Storage.prototype.setItem = function(key, value) {
    // Autenticação continua no localStorage
    if (key === 'authToken' || key === 'currentUser') {
        return originalLocalStorage.setItem(key, value);
    }

    // Não fazer nada - dados serão salvos via API
    console.log(`localStorage.setItem('${key}') ignorado - use API`);
};

// Flag para saber se estamos usando API
window.usingAPI = true;

console.log('🔌 API Wrapper carregado');
