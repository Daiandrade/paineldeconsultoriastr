// ===== CONFIGURAÇÃO DA API =====
// Detecta automaticamente o ambiente e usa a URL correta

const CONFIG = {
    // Detecta se está rodando localmente ou em produção
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'  // Desenvolvimento local
        : '',  // Produção (usa URL relativa para Netlify Functions)

    // Timeout padrão para requisições (10 segundos)
    REQUEST_TIMEOUT: 10000,

    // Chave para armazenar o token JWT no localStorage
    TOKEN_KEY: 'tr_auth_token',

    // Chave para armazenar dados do usuário atual
    USER_KEY: 'tr_current_user'
};

// Helper para fazer requisições autenticadas
const api = {
    // Obter token do localStorage
    getToken() {
        return localStorage.getItem(CONFIG.TOKEN_KEY);
    },

    // Salvar token no localStorage
    setToken(token) {
        localStorage.setItem(CONFIG.TOKEN_KEY, token);
    },

    // Remover token do localStorage
    removeToken() {
        localStorage.removeItem(CONFIG.TOKEN_KEY);
        localStorage.removeItem(CONFIG.USER_KEY);
    },

    // Obter usuário atual
    getCurrentUser() {
        const userStr = localStorage.getItem(CONFIG.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },

    // Salvar usuário atual
    setCurrentUser(user) {
        localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(user));
    },

    // Fazer requisição GET
    async get(endpoint) {
        const token = this.getToken();
        const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro na requisição');
        }

        return response.json();
    },

    // Fazer requisição POST
    async post(endpoint, data) {
        const token = this.getToken();
        const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro na requisição');
        }

        return response.json();
    },

    // Fazer requisição PUT
    async put(endpoint, data) {
        const token = this.getToken();
        const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro na requisição');
        }

        return response.json();
    },

    // Fazer requisição DELETE
    async delete(endpoint) {
        const token = this.getToken();
        const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro na requisição');
        }

        return response.json();
    }
};

console.log('✅ Configuração da API carregada:', CONFIG.API_BASE_URL || 'Produção (relativo)');
