// ===== API CONFIG - Configuração e funções auxiliares da API =====
// Este arquivo deve ser carregado ANTES do app.js

const API_CONFIG = {
    // Em produção no Netlify, as funções são acessadas via /.netlify/functions/
    baseURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api'
        : '/.netlify/functions/server/api',
    timeout: 30000
};

// Função principal para requisições à API
async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    const fullURL = `${API_CONFIG.baseURL}${endpoint}`;
    console.log(`🔄 API Request: ${options.method || 'GET'} ${fullURL}`);

    try {
        const response = await fetch(fullURL, config);

        // Token inválido ou expirado
        if ((response.status === 401 || response.status === 403) && !options.skipAuth) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');

            // Redirecionar para login se não estiver na tela de login
            if (!window.location.pathname.includes('login')) {
                const loginScreen = document.getElementById('loginScreen');
                const dashboardScreen = document.getElementById('dashboardScreen');
                if (loginScreen && dashboardScreen) {
                    loginScreen.classList.add('active');
                    dashboardScreen.classList.remove('active');
                }
            }

            throw new Error('Sessão expirada. Faça login novamente.');
        }

        const data = await response.json();

        if (!response.ok) {
            console.error(`❌ API Error: ${response.status}`, data);
            throw new Error(data.error || `Erro HTTP ${response.status}`);
        }

        console.log(`✅ API Success: ${response.status}`, data);
        return data;
    } catch (error) {
        console.error('❌ API Request Failed:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
        }
        throw error;
    }
}

// Wrapper para GET
async function apiGet(endpoint) {
    return apiRequest(endpoint, { method: 'GET' });
}

// Wrapper para POST
async function apiPost(endpoint, data) {
    return apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

// Wrapper para PUT
async function apiPut(endpoint, data) {
    return apiRequest(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

// Wrapper para DELETE
async function apiDelete(endpoint) {
    return apiRequest(endpoint, { method: 'DELETE' });
}

// Função para verificar se o backend está online
async function checkBackendHealth() {
    try {
        const response = await fetch(API_CONFIG.baseURL.replace('/api', '/'), {
            method: 'HEAD',
            cache: 'no-cache'
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Mostrar erro amigável
function showError(message, title = 'Erro') {
    console.error(`${title}:`, message);
    alert(`${title}\n\n${message}`);
}

// Mostrar sucesso
function showSuccess(message) {
    console.log('Sucesso:', message);
    // Você pode adicionar um toast notification aqui
}

// Objeto API para uso no app.js
const api = {
    get: apiGet,
    post: apiPost,
    put: apiPut,
    delete: apiDelete,

    // Funções auxiliares para gerenciar token
    getToken: () => localStorage.getItem('authToken'),
    setToken: (token) => localStorage.setItem('authToken', token),
    removeToken: () => localStorage.removeItem('authToken'),

    // Funções auxiliares para gerenciar usuário
    getCurrentUser: () => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },
    setCurrentUser: (user) => localStorage.setItem('currentUser', JSON.stringify(user))
};

console.log('✅ API Config carregado');
console.log('📡 API URL:', API_CONFIG.baseURL);
