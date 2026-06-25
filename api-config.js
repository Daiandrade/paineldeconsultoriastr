// ===== API CONFIG - Configuração e funções auxiliares da API =====
// Este arquivo deve ser carregado ANTES do app.js

const API_CONFIG = {
    baseURL: window.location.origin + '/api',
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

    try {
        const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, config);

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
            throw new Error(data.error || `Erro HTTP ${response.status}`);
        }

        return data;
    } catch (error) {
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

console.log('✅ API Config carregado');
console.log('📡 API URL:', API_CONFIG.baseURL);
