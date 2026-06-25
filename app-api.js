// ===== APP-API.JS - Frontend com Integração API Backend =====

// Configuração da API
const API_URL = window.location.origin + '/api';

// Estado global
let currentUser = null;
let authToken = null;
let editingId = null;
let currentTab = 'basicInfo';
let currentParticipants = [];
let currentRoadmapItems = [];

// ===== FUNÇÕES DE API =====

// Função auxiliar para fazer requisições autenticadas
async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);

        // Se token inválido, fazer logout
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Sessão expirada. Faça login novamente.');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro na requisição');
        }

        return data;
    } catch (error) {
        console.error('Erro na API:', error);
        throw error;
    }
}

// ===== AUTENTICAÇÃO =====

async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');

    if (!username || !password) {
        errorDiv.textContent = 'Preencha todos os campos';
        errorDiv.classList.add('show');
        return;
    }

    try {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });

        // Salvar token e usuário
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));

        currentUser = data.user;
        authToken = data.token;

        errorDiv.classList.remove('show');
        showDashboard();
    } catch (error) {
        errorDiv.textContent = error.message || 'Usuário ou senha incorretos';
        errorDiv.classList.add('show');
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    currentUser = null;
    authToken = null;

    document.getElementById('loginScreen').classList.add('active');
    document.getElementById('dashboardScreen').classList.remove('active');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function showDashboard() {
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('dashboardScreen').classList.add('active');
    document.getElementById('currentUser').textContent = currentUser.name;

    // Mostrar botão de usuários apenas para admin
    if (currentUser.perfil === 'admin') {
        document.getElementById('btnGerenciarUsuarios').style.display = 'inline-block';
    }

    loadDashboardData();
}

// ===== INICIALIZAÇÃO =====
function initApp() {
    // Verificar se existe sessão salva
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');

    if (savedToken && savedUser) {
        authToken = savedToken;
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
}

// ===== CARREGAMENTO DE DADOS =====

async function loadDashboardData() {
    try {
        await Promise.all([
            updateStats(),
            loadAgendas(),
            loadConsultores(),
            loadProdutos(),
            loadRoadmap(),
            loadTemas()
        ]);

        populateSelects();
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
        alert('Erro ao carregar dados. Tente fazer login novamente.');
    }
}

async function updateStats() {
    try {
        const stats = await apiRequest('/stats');

        document.getElementById('agendasHoje').textContent = stats.agendasHoje;
        document.getElementById('agendasMes').textContent = stats.agendasMes;
        document.getElementById('consultoresAtivos').textContent = stats.consultoresAtivos;
        document.getElementById('capacidadeRestante').textContent = stats.capacidadeRestante;
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// ===== AGENDAS =====

async function loadAgendas() {
    try {
        const agendas = await apiRequest('/agendas');
        const tbody = document.getElementById('agendasTableBody');
        tbody.innerHTML = '';

        if (agendas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:#999;">Nenhuma agenda cadastrada</td></tr>';
            return;
        }

        agendas.sort((a, b) => new Date(b.data + ' ' + b.hora) - new Date(a.data + ' ' + a.hora));

        agendas.forEach(agenda => {
            const postsHtml = `
                <div class="post-indicators">
                    <div class="post-indicator ${agenda.postLinkedin ? 'done' : 'pending'}" title="LinkedIn">L</div>
                    <div class="post-indicator ${agenda.postInterno ? 'done' : 'pending'}" title="Interno">I</div>
                </div>
            `;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${agenda.id.toString().padStart(3, '0')}</td>
                <td>${formatDate(agenda.data)} ${agenda.hora}</td>
                <td><strong>${agenda.consultorNome}</strong></td>
                <td>${agenda.cliente}</td>
                <td><span style="display:inline-block;padding:4px 8px;background:#f0f0f0;border-radius:4px;font-size:12px;">${agenda.tema}</span></td>
                <td>${agenda.participantes.length} pessoas</td>
                <td><span class="status-badge ${agenda.status.toLowerCase()}">${agenda.status}</span></td>
                <td>${postsHtml}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon edit" onclick="editAgenda(${agenda.id})" title="Editar">✏️</button>
                        <button class="btn-icon" onclick="viewAgendaDetails(${agenda.id})" title="Visualizar">👁️</button>
                        <button class="btn-icon delete" onclick="deleteAgenda(${agenda.id})" title="Excluir">🗑️</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar agendas:', error);
    }
}

async function saveAgenda() {
    const consultorId = parseInt(document.getElementById('agendaConsultor').value);
    const cliente = document.getElementById('agendaCliente').value.trim();
    const data = document.getElementById('agendaData').value;
    const hora = document.getElementById('agendaHora').value;
    const tema = document.getElementById('agendaTema').value;
    const duracao = parseInt(document.getElementById('agendaDuracao').value);
    const observacoes = document.getElementById('agendaObs').value.trim();
    const ata = document.getElementById('agendaAta').value.trim();
    const postLinkedin = document.getElementById('postLinkedin').checked;
    const postInterno = document.getElementById('postInterno').checked;
    const postLinkedinMotivo = document.getElementById('reasonLinkedinText').value.trim();
    const postInternoMotivo = document.getElementById('reasonInternoText').value.trim();

    if (!consultorId || !cliente || !data || !hora || !tema) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    try {
        // Buscar nome do consultor
        const consultores = await apiRequest('/consultores');
        const consultor = consultores.find(c => c.id === consultorId);

        if (currentParticipants.length > consultor.maxParticipantes) {
            alert(`Número máximo de participantes excedido! Limite: ${consultor.maxParticipantes}`);
            return;
        }

        const agendaData = {
            consultorId,
            consultorNome: consultor.nome,
            cliente,
            data,
            hora,
            tema,
            status: editingId ? undefined : 'Agendada', // Manter status ao editar
            duracao,
            observacoes,
            participantes: currentParticipants,
            roadmapItems: currentRoadmapItems,
            ata,
            postLinkedin,
            postLinkedinMotivo,
            postInterno,
            postInternoMotivo
        };

        if (editingId) {
            await apiRequest(`/agendas/${editingId}`, {
                method: 'PUT',
                body: JSON.stringify(agendaData)
            });
        } else {
            await apiRequest('/agendas', {
                method: 'POST',
                body: JSON.stringify(agendaData)
            });
        }

        closeAgendaModal();
        await loadAgendas();
        await updateStats();
        await loadConsultores(); // Atualizar contadores
    } catch (error) {
        console.error('Erro ao salvar agenda:', error);
        alert('Erro ao salvar agenda: ' + error.message);
    }
}

async function deleteAgenda(id) {
    if (!confirm('Deseja realmente excluir esta agenda?')) return;

    try {
        await apiRequest(`/agendas/${id}`, { method: 'DELETE' });
        await loadAgendas();
        await updateStats();
        await loadConsultores();
    } catch (error) {
        console.error('Erro ao deletar agenda:', error);
        alert('Erro ao deletar agenda: ' + error.message);
    }
}

// ===== CONSULTORES =====

async function loadConsultores() {
    try {
        const consultores = await apiRequest('/consultores');
        const grid = document.getElementById('consultoresGrid');
        grid.innerHTML = '';

        consultores.forEach(consultor => {
            const div = document.createElement('div');
            div.className = 'consultor-card';

            const iniciais = consultor.nome.split(' ').map(n => n[0]).join('').substring(0, 2);
            const disponivel = consultor.agendasDisponiveis - consultor.agendasUsadas;
            const percentualUsado = consultor.agendasDisponiveis > 0
                ? Math.round((consultor.agendasUsadas / consultor.agendasDisponiveis) * 100)
                : 0;

            let corProgresso = '#10B981';
            if (percentualUsado >= 80) corProgresso = '#EF4444';
            else if (percentualUsado >= 60) corProgresso = '#F59E0B';

            div.innerHTML = `
                <div class="consultor-header">
                    <div class="consultor-avatar">${iniciais}</div>
                    <span class="consultor-status ${consultor.status.toLowerCase()}">${consultor.status}</span>
                </div>
                <div class="consultor-info">
                    <h3>${consultor.nome}</h3>
                    <p>📧 ${consultor.email}</p>
                    <p>📱 ${consultor.telefone}</p>
                    <p>⭐ ${consultor.especialidade}</p>
                    <p>👥 Máx: ${consultor.maxParticipantes} participantes</p>
                </div>
                <div class="consultor-stats">
                    <div class="consultor-stat">
                        <strong>${consultor.agendasUsadas}</strong>
                        <span>Usadas este mês</span>
                    </div>
                    <div class="consultor-stat">
                        <strong>${disponivel}</strong>
                        <span>Restantes</span>
                    </div>
                </div>
                <div style="margin-top:12px;">
                    <div style="background:#E5E7EB;height:8px;border-radius:4px;overflow:hidden;">
                        <div style="background:${corProgresso};height:100%;width:${percentualUsado}%;transition:width 0.3s ease;"></div>
                    </div>
                    <div style="text-align:center;font-size:11px;color:#6B7280;margin-top:4px;">
                        ${percentualUsado}% utilizado (${consultor.agendasUsadas}/${consultor.agendasDisponiveis})
                    </div>
                </div>
                <div class="consultor-actions" style="margin-top:12px;">
                    <button class="btn-secondary" onclick="editConsultor(${consultor.id})">✏️ Editar</button>
                    <button class="btn-secondary" onclick="deleteConsultor(${consultor.id})">🗑️</button>
                </div>
            `;
            grid.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar consultores:', error);
    }
}

// ===== CONTINUARÁ NO PRÓXIMO ARQUIVO =====
// (O arquivo está ficando grande, vou criar funções auxiliares separadas)

// FUNÇÕES UTILITÁRIAS
function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Adicionar listener Enter no login
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                login();
            }
        });
    }

    // Inicializar app
    initApp();
});
