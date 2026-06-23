// ===== DADOS INICIAIS =====
let currentUser = null;
let editingId = null;
let currentTab = 'basicInfo';
let currentParticipants = [];
let currentRoadmapItems = [];

// Usuários padrão
const defaultUsers = [
    { username: 'admin', password: 'admin123', name: 'Administrador', perfil: 'admin' },
    { username: 'jorge', password: 'jorge123', name: 'Jorge Campos', perfil: 'user' }
];

// Consultores com limite de participantes
const defaultConsultores = [
    {
        id: 1,
        nome: 'Jorge Campos',
        email: 'jorge.campos@tr.com',
        telefone: '(11) 98765-4321',
        especialidade: 'SPED Fiscal',
        agendasDisponiveis: 20,
        agendasUsadas: 5,
        maxParticipantes: 15,
        status: 'Ativo'
    },
    {
        id: 2,
        nome: 'Maria Silva',
        email: 'maria.silva@tr.com',
        telefone: '(11) 98765-1234',
        especialidade: 'SPED Contábil',
        agendasDisponiveis: 15,
        agendasUsadas: 8,
        maxParticipantes: 10,
        status: 'Ativo'
    },
    {
        id: 3,
        nome: 'Carlos Santos',
        email: 'carlos.santos@tr.com',
        telefone: '(11) 98765-5678',
        especialidade: 'Reinf',
        agendasDisponiveis: 18,
        agendasUsadas: 3,
        maxParticipantes: 12,
        status: 'Ativo'
    }
];

// Produtos TR
const defaultProdutos = [
    {
        id: 1,
        nome: 'SPED Fiscal Pro',
        descricao: 'Solução completa para SPED Fiscal',
        categoria: 'SPED',
        cor: '#FF8000'
    },
    {
        id: 2,
        nome: 'SPED Contábil',
        descricao: 'Escrituração Contábil Digital',
        categoria: 'SPED',
        cor: '#003D5C'
    },
    {
        id: 3,
        nome: 'Reinf Manager',
        descricao: 'Gestão de Retenções Federais',
        categoria: 'Fiscal',
        cor: '#10B981'
    }
];

// Itens de Roadmap
const defaultRoadmap = [
    {
        id: 1,
        titulo: 'Validação automática de XML',
        produtoId: 1,
        produtoNome: 'SPED Fiscal Pro',
        descricao: 'Implementar validação automática de arquivos XML do SPED com regras de negócio atualizadas',
        status: 'Em Desenvolvimento',
        prioridade: 'Alta',
        previsao: '2026-08-15',
        dependeReceita: true,
        dependencias: 'Aguardando atualização do manual da Receita Federal',
        agendaId: null
    },
    {
        id: 2,
        titulo: 'Dashboard Analytics Fiscal',
        produtoId: 1,
        produtoNome: 'SPED Fiscal Pro',
        descricao: 'Criar dashboard com gráficos e indicadores fiscais em tempo real',
        status: 'Planejado',
        prioridade: 'Média',
        previsao: '2026-09-30',
        dependeReceita: false,
        dependencias: '',
        agendaId: null
    },
    {
        id: 3,
        titulo: 'Importação em lote de escriturações',
        produtoId: 2,
        produtoNome: 'SPED Contábil',
        descricao: 'Permitir importação de múltiplas escriturações contábeis simultaneamente',
        status: 'Planejado',
        prioridade: 'Baixa',
        previsao: '2026-10-15',
        dependeReceita: false,
        dependencias: '',
        agendaId: null
    },
    {
        id: 4,
        titulo: 'Integração com sistema folha de pagamento',
        produtoId: 3,
        produtoNome: 'Reinf Manager',
        descricao: 'Integração automática com principais sistemas de folha do mercado',
        status: 'Em Desenvolvimento',
        prioridade: 'Crítica',
        previsao: '2026-07-30',
        dependeReceita: false,
        dependencias: 'Aprovação do time de arquitetura, homologação com parceiros',
        agendaId: null
    },
    {
        id: 5,
        titulo: 'Relatório de inconsistências Reinf',
        produtoId: 3,
        produtoNome: 'Reinf Manager',
        descricao: 'Gerar relatório detalhado de inconsistências antes do envio',
        status: 'Planejado',
        prioridade: 'Alta',
        previsao: '2026-08-20',
        dependeReceita: true,
        dependencias: 'Definição de layout pela Receita Federal',
        agendaId: null
    },
    {
        id: 6,
        titulo: 'API REST para exportação de dados',
        produtoId: 1,
        produtoNome: 'SPED Fiscal Pro',
        descricao: 'Criar API para permitir exportação programática de dados fiscais',
        status: 'Planejado',
        prioridade: 'Média',
        previsao: '2026-11-10',
        dependeReceita: false,
        dependencias: '',
        agendaId: null
    },
    {
        id: 7,
        titulo: 'Módulo de conciliação contábil',
        produtoId: 2,
        produtoNome: 'SPED Contábil',
        descricao: 'Ferramenta para conciliar lançamentos contábeis automaticamente',
        status: 'Em Desenvolvimento',
        prioridade: 'Alta',
        previsao: '2026-07-15',
        dependeReceita: false,
        dependencias: '',
        agendaId: null
    }
];

// Temas
const defaultTemas = [
    { id: 1, nome: 'SPED Fiscal', descricao: 'Consultoria sobre obrigações fiscais', cor: '#FF8000', count: 0 },
    { id: 2, nome: 'SPED Contábil', descricao: 'Consultoria sobre escrituração contábil', cor: '#003D5C', count: 0 },
    { id: 3, nome: 'Reinf', descricao: 'Consultoria sobre retenções federais', cor: '#10B981', count: 0 },
    { id: 4, nome: 'eSocial', descricao: 'Consultoria sobre eSocial', cor: '#3B82F6', count: 0 },
    { id: 5, nome: 'EFD Contribuições', descricao: 'Consultoria sobre EFD Contribuições', cor: '#8B5CF6', count: 0 }
];

// Agendas expandidas
const defaultAgendas = [
    {
        id: 1,
        consultorId: 1,
        consultorNome: 'Jorge Campos',
        cliente: 'Empresa ABC Ltda',
        data: '2026-06-25',
        hora: '10:00',
        tema: 'SPED Fiscal',
        status: 'Agendada',
        duracao: 60,
        observacoes: 'Dúvidas sobre apuração de ICMS',
        participantes: [
            { nome: 'João Silva', email: 'joao@abc.com' },
            { nome: 'Maria Santos', email: 'maria@abc.com' }
        ],
        roadmapItems: [],
        ata: '',
        postLinkedin: false,
        postLinkedinMotivo: '',
        postInterno: false,
        postInternoMotivo: ''
    },
    {
        id: 2,
        consultorId: 2,
        consultorNome: 'Maria Silva',
        cliente: 'Empresa XYZ S/A',
        data: '2026-06-23',
        hora: '14:00',
        tema: 'SPED Contábil',
        status: 'Realizada',
        duracao: 90,
        observacoes: 'Implementação inicial do SPED',
        participantes: [
            { nome: 'Carlos Oliveira', email: 'carlos@xyz.com' }
        ],
        roadmapItems: [],
        ata: 'Reunião realizada com sucesso. Principais pontos:\n- Apresentação do sistema\n- Definição de cronograma\n- Próximos passos',
        postLinkedin: true,
        postLinkedinMotivo: '',
        postInterno: true,
        postInternoMotivo: ''
    },
    {
        id: 3,
        consultorId: 1,
        consultorNome: 'Jorge Campos',
        cliente: 'Indústria Beta',
        data: '2026-06-22',
        hora: '15:30',
        tema: 'SPED Fiscal',
        status: 'Agendada',
        duracao: 60,
        observacoes: '',
        participantes: [
            { nome: 'Ana Paula', email: 'ana@beta.com' },
            { nome: 'Roberto Lima', email: 'roberto@beta.com' },
            { nome: 'Fernanda Costa', email: 'fernanda@beta.com' }
        ],
        roadmapItems: [],
        ata: '',
        postLinkedin: false,
        postLinkedinMotivo: 'Aguardando aprovação do cliente',
        postInterno: false,
        postInternoMotivo: 'Pendente de conclusão da agenda'
    }
];

// ===== INICIALIZAÇÃO =====
function initApp() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem('consultores')) {
        localStorage.setItem('consultores', JSON.stringify(defaultConsultores));
    }
    if (!localStorage.getItem('produtos')) {
        localStorage.setItem('produtos', JSON.stringify(defaultProdutos));
    }
    if (!localStorage.getItem('roadmap')) {
        localStorage.setItem('roadmap', JSON.stringify(defaultRoadmap));
    }
    if (!localStorage.getItem('temas')) {
        localStorage.setItem('temas', JSON.stringify(defaultTemas));
    }
    if (!localStorage.getItem('agendas')) {
        localStorage.setItem('agendas', JSON.stringify(defaultAgendas));
    }

    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
}

// ===== LOGIN =====
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');

    if (!username || !password) {
        errorDiv.textContent = 'Preencha todos os campos';
        errorDiv.classList.add('show');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = {
            username: user.username,
            name: user.name,
            perfil: user.perfil || 'user' // Default para 'user' se não tiver perfil
        };
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        errorDiv.classList.remove('show');
        showDashboard();
    } else {
        errorDiv.textContent = 'Usuário ou senha incorretos';
        errorDiv.classList.add('show');
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    currentUser = null;
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

// ===== NAVEGAÇÃO =====
function showSection(sectionName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');

    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName + 'Section').classList.add('active');

    if (sectionName === 'agendas') loadAgendas();
    if (sectionName === 'consultores') loadConsultores();
    if (sectionName === 'produtos') loadProdutos();
    if (sectionName === 'roadmap') loadRoadmap();
    if (sectionName === 'temas') loadTemas();
    if (sectionName === 'relatorios') loadRelatorios();
}

// ===== TABS =====
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    currentTab = tabName;
}

function switchTabProgrammatic(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Encontrar o botão da aba pelo onclick
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(tabName)) {
            btn.classList.add('active');
        }
    });

    const tabContent = document.getElementById(tabName);
    if (tabContent) {
        tabContent.classList.add('active');
    }
    currentTab = tabName;
}

// ===== DASHBOARD =====
function loadDashboardData() {
    // Recalcular agendas antes de exibir qualquer coisa
    recalcularAgendasConsultores();

    updateStats();
    loadAgendas();
    loadConsultores();
    loadProdutos();
    loadRoadmap();
    loadTemas();
    populateSelects();
}

function updateStats() {
    const agendas = JSON.parse(localStorage.getItem('agendas'));
    const consultores = JSON.parse(localStorage.getItem('consultores'));

    // Data de hoje
    const hoje = new Date();
    const hojeDateString = hoje.toISOString().split('T')[0];
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    // Agendas de hoje
    const agendasHoje = agendas.filter(a => a.data === hojeDateString && a.status === 'Agendada').length;

    // Agendas deste mês (Agendadas + Realizadas)
    const agendasMes = agendas.filter(a => {
        if (!a.data) return false;
        const dataAgenda = new Date(a.data + 'T00:00:00');
        const mesAgenda = dataAgenda.getMonth();
        const anoAgenda = dataAgenda.getFullYear();
        return mesAgenda === mesAtual && anoAgenda === anoAtual &&
               (a.status === 'Agendada' || a.status === 'Realizada');
    }).length;

    // Consultores ativos
    const consultoresAtivos = consultores.filter(c => c.status === 'Ativo').length;

    // Capacidade total disponível este mês
    const capacidadeTotal = consultores
        .filter(c => c.status === 'Ativo')
        .reduce((sum, c) => sum + c.agendasDisponiveis, 0);

    const capacidadeUsada = consultores
        .filter(c => c.status === 'Ativo')
        .reduce((sum, c) => sum + c.agendasUsadas, 0);

    const capacidadeRestante = capacidadeTotal - capacidadeUsada;

    // Atualizar DOM
    document.getElementById('agendasHoje').textContent = agendasHoje;
    document.getElementById('agendasMes').textContent = agendasMes;
    document.getElementById('consultoresAtivos').textContent = consultoresAtivos;
    document.getElementById('capacidadeRestante').textContent = capacidadeRestante;
}

// ===== AGENDAS =====
function loadAgendas() {
    const agendas = JSON.parse(localStorage.getItem('agendas')) || [];
    const tbody = document.getElementById('agendasTableBody');
    tbody.innerHTML = '';

    if (agendas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:#999;">Nenhuma agenda cadastrada</td></tr>';
        return;
    }

    agendas.sort((a, b) => new Date(b.data + ' ' + b.hora) - new Date(a.data + ' ' + a.hora));

    agendas.forEach(agenda => {
        // Garantir compatibilidade com dados antigos
        if (!agenda.participantes) agenda.participantes = [];
        if (!agenda.roadmapItems) agenda.roadmapItems = [];
        if (agenda.postLinkedin === undefined) agenda.postLinkedin = false;
        if (agenda.postInterno === undefined) agenda.postInterno = false;

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
}

function filterAgendas() {
    const searchTerm = document.getElementById('searchAgenda').value.toLowerCase();
    const filterConsultor = document.getElementById('filterConsultor').value;
    const filterStatus = document.getElementById('filterStatus').value;

    const agendas = JSON.parse(localStorage.getItem('agendas')) || [];
    const filtered = agendas.filter(agenda => {
        const matchSearch = agenda.cliente.toLowerCase().includes(searchTerm) ||
                          agenda.consultorNome.toLowerCase().includes(searchTerm) ||
                          agenda.tema.toLowerCase().includes(searchTerm);
        const matchConsultor = !filterConsultor || agenda.consultorNome === filterConsultor;
        const matchStatus = !filterStatus || agenda.status === filterStatus;
        return matchSearch && matchConsultor && matchStatus;
    });

    const tbody = document.getElementById('agendasTableBody');
    tbody.innerHTML = '';

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:#999;">Nenhuma agenda encontrada</td></tr>';
        return;
    }

    filtered.forEach(agenda => {
        // Garantir compatibilidade
        if (!agenda.participantes) agenda.participantes = [];
        if (!agenda.roadmapItems) agenda.roadmapItems = [];
        if (agenda.postLinkedin === undefined) agenda.postLinkedin = false;
        if (agenda.postInterno === undefined) agenda.postInterno = false;

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
}

function openAgendaModal(startTab = 'basicInfo') {
    editingId = null;
    currentParticipants = [];
    currentRoadmapItems = [];

    document.getElementById('agendaModalTitle').textContent = 'Nova Agenda';
    document.getElementById('agendaConsultor').value = '';
    document.getElementById('agendaCliente').value = '';
    document.getElementById('agendaData').value = '';
    document.getElementById('agendaHora').value = '';
    document.getElementById('agendaTema').value = '';
    document.getElementById('agendaDuracao').value = '60';
    document.getElementById('agendaObs').value = '';
    document.getElementById('agendaAta').value = '';
    document.getElementById('postLinkedin').checked = false;
    document.getElementById('postInterno').checked = false;
    document.getElementById('reasonLinkedinText').value = '';
    document.getElementById('reasonInternoText').value = '';
    document.getElementById('reasonLinkedin').style.display = 'none';
    document.getElementById('reasonInterno').style.display = 'none';

    updateMaxParticipants();
    renderParticipants();
    renderAgendaRoadmap();
    renderAgendaRoadmapTimeline();

    document.getElementById('agendaModal').classList.add('active');

    // Ir para a aba especificada
    switchTabProgrammatic(startTab);
}

function openAgendaModalFromRoadmap() {
    openAgendaModal('roadmapItems');
}

function closeAgendaModal() {
    document.getElementById('agendaModal').classList.remove('active');
}

function editAgenda(id) {
    const agendas = JSON.parse(localStorage.getItem('agendas'));
    const agenda = agendas.find(a => a.id === id);

    if (agenda) {
        editingId = id;
        currentParticipants = [...agenda.participantes];
        currentRoadmapItems = [...(agenda.roadmapItems || [])];

        document.getElementById('agendaModalTitle').textContent = 'Editar Agenda';
        document.getElementById('agendaConsultor').value = agenda.consultorId;
        document.getElementById('agendaCliente').value = agenda.cliente;
        document.getElementById('agendaData').value = agenda.data;
        document.getElementById('agendaHora').value = agenda.hora;
        document.getElementById('agendaTema').value = agenda.tema;
        document.getElementById('agendaDuracao').value = agenda.duracao;
        document.getElementById('agendaObs').value = agenda.observacoes || '';
        document.getElementById('agendaAta').value = agenda.ata || '';
        document.getElementById('postLinkedin').checked = agenda.postLinkedin || false;
        document.getElementById('postInterno').checked = agenda.postInterno || false;
        document.getElementById('reasonLinkedinText').value = agenda.postLinkedinMotivo || '';
        document.getElementById('reasonInternoText').value = agenda.postInternoMotivo || '';

        togglePostReason('linkedin');
        togglePostReason('interno');
        updateMaxParticipants();
        renderParticipants();
        renderAgendaRoadmap();
        renderAgendaRoadmapTimeline();
        updateAtaCounter();

        document.getElementById('agendaModal').classList.add('active');
    }
}

function saveAgenda() {
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

    const agendas = JSON.parse(localStorage.getItem('agendas'));
    const consultores = JSON.parse(localStorage.getItem('consultores'));
    const consultor = consultores.find(c => c.id === consultorId);

    if (currentParticipants.length > consultor.maxParticipantes) {
        alert(`Número máximo de participantes excedido! Limite: ${consultor.maxParticipantes}`);
        return;
    }

    if (editingId) {
        const index = agendas.findIndex(a => a.id === editingId);
        agendas[index] = {
            ...agendas[index],
            consultorId,
            consultorNome: consultor.nome,
            cliente,
            data,
            hora,
            tema,
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
    } else {
        const newId = agendas.length > 0 ? Math.max(...agendas.map(a => a.id)) + 1 : 1;
        agendas.push({
            id: newId,
            consultorId,
            consultorNome: consultor.nome,
            cliente,
            data,
            hora,
            tema,
            status: 'Agendada',
            duracao,
            observacoes,
            participantes: currentParticipants,
            roadmapItems: currentRoadmapItems,
            ata,
            postLinkedin,
            postLinkedinMotivo,
            postInterno,
            postInternoMotivo
        });
    }

    localStorage.setItem('agendas', JSON.stringify(agendas));

    // Recalcular todas as agendas usadas dos consultores
    recalcularAgendasConsultores();

    closeAgendaModal();
    loadAgendas();
    updateStats();
}

function deleteAgenda(id) {
    if (!confirm('Deseja realmente excluir esta agenda?')) return;

    let agendas = JSON.parse(localStorage.getItem('agendas'));
    agendas = agendas.filter(a => a.id !== id);
    localStorage.setItem('agendas', JSON.stringify(agendas));

    // Recalcular todas as agendas usadas dos consultores
    recalcularAgendasConsultores();

    loadAgendas();
    updateStats();
}

function viewAgendaDetails(id) {
    const agendas = JSON.parse(localStorage.getItem('agendas'));
    const agenda = agendas.find(a => a.id === id);

    if (agenda) {
        let details = `
AGENDA #${agenda.id}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Data/Hora: ${formatDate(agenda.data)} às ${agenda.hora}
👤 Consultor: ${agenda.consultorNome}
🏢 Cliente: ${agenda.cliente}
📚 Tema: ${agenda.tema}
⏱️ Duração: ${agenda.duracao} min
📊 Status: ${agenda.status}

👥 PARTICIPANTES (${agenda.participantes.length}):
${agenda.participantes.map(p => `   • ${p.nome} - ${p.email}`).join('\n')}

🗺️ ITENS ROADMAP (${(agenda.roadmapItems || []).length}):
${(agenda.roadmapItems || []).map(r => `   • ${r.titulo} (${r.produtoNome})`).join('\n') || '   Nenhum item vinculado'}

📝 ATA:
${agenda.ata || 'Sem ata registrada'}

📱 STATUS DE POSTS:
   LinkedIn: ${agenda.postLinkedin ? '✅ Realizado' : '❌ Não realizado'}
   ${!agenda.postLinkedin && agenda.postLinkedinMotivo ? `   Motivo: ${agenda.postLinkedinMotivo}` : ''}

   Interno: ${agenda.postInterno ? '✅ Realizado' : '❌ Não realizado'}
   ${!agenda.postInterno && agenda.postInternoMotivo ? `   Motivo: ${agenda.postInternoMotivo}` : ''}
        `;
        alert(details);
    }
}

// ===== PARTICIPANTES =====
function updateMaxParticipants() {
    const consultorId = parseInt(document.getElementById('agendaConsultor').value);
    if (!consultorId) {
        document.getElementById('maxParticipants').textContent = '0';
        return;
    }

    const consultores = JSON.parse(localStorage.getItem('consultores'));
    const consultor = consultores.find(c => c.id === consultorId);
    document.getElementById('maxParticipants').textContent = consultor ? consultor.maxParticipantes : '0';
    document.getElementById('currentParticipants').textContent = currentParticipants.length;
}

function addParticipant() {
    const name = document.getElementById('participantName').value.trim();
    const email = document.getElementById('participantEmail').value.trim();

    if (!name) {
        alert('Digite o nome do participante!');
        return;
    }

    const consultorId = parseInt(document.getElementById('agendaConsultor').value);
    if (!consultorId) {
        alert('Selecione um consultor primeiro!');
        return;
    }

    const consultores = JSON.parse(localStorage.getItem('consultores'));
    const consultor = consultores.find(c => c.id === consultorId);

    if (currentParticipants.length >= consultor.maxParticipantes) {
        alert(`Limite de participantes atingido! Máximo: ${consultor.maxParticipantes}`);
        return;
    }

    currentParticipants.push({ nome: name, email: email || '' });
    document.getElementById('participantName').value = '';
    document.getElementById('participantEmail').value = '';
    renderParticipants();
}

function removeParticipant(index) {
    currentParticipants.splice(index, 1);
    renderParticipants();
}

function renderParticipants() {
    const list = document.getElementById('participantsList');
    list.innerHTML = '';

    currentParticipants.forEach((p, index) => {
        const div = document.createElement('div');
        div.className = 'participant-item';
        div.innerHTML = `
            <div class="participant-info">
                <strong>${p.nome}</strong>
                <span>${p.email || 'Sem email'}</span>
            </div>
            <button class="btn-icon delete" onclick="removeParticipant(${index})">🗑️</button>
        `;
        list.appendChild(div);
    });

    document.getElementById('currentParticipants').textContent = currentParticipants.length;
}

// ===== ROADMAP NA AGENDA (KANBAN VISUAL FODA) =====
function renderAgendaRoadmap() {
    const kanban = document.getElementById('agendaRoadmapKanban');
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const roadmap = JSON.parse(localStorage.getItem('roadmap')) || [];

    kanban.innerHTML = '';

    // Adicionar contador total
    const totalSelected = currentRoadmapItems.length;
    const counterDiv = document.createElement('div');
    counterDiv.style.cssText = 'position:sticky;top:0;background:linear-gradient(135deg,#10B981,#059669);color:white;padding:16px 20px;border-radius:10px;margin-bottom:20px;text-align:center;box-shadow:0 4px 6px rgba(0,0,0,0.1);z-index:10;';
    counterDiv.innerHTML = `
        <div style="font-size:32px;font-weight:bold;margin-bottom:4px;">${totalSelected}</div>
        <div style="font-size:14px;opacity:0.95;">item${totalSelected !== 1 ? 's' : ''} do roadmap selecionado${totalSelected !== 1 ? 's' : ''} para esta agenda</div>
        <div style="font-size:12px;opacity:0.8;margin-top:8px;">💡 Clique nos cards abaixo para selecionar/desselecionar</div>
    `;
    kanban.appendChild(counterDiv);

    if (produtos.length === 0) {
        const emptyDiv = document.createElement('p');
        emptyDiv.style.cssText = 'color:#999;text-align:center;padding:40px;width:100%;';
        emptyDiv.textContent = 'Nenhum produto cadastrado. Cadastre produtos primeiro!';
        kanban.appendChild(emptyDiv);
        return;
    }

    // Criar wrapper para as colunas
    const columnsWrapper = document.createElement('div');
    columnsWrapper.style.cssText = 'display:flex;gap:20px;overflow-x:auto;padding:10px 0;min-height:400px;';

    produtos.forEach(produto => {
        const produtoItems = roadmap.filter(r => r.produtoId === produto.id && r.status !== 'Concluído' && r.status !== 'Cancelado');
        const selectedCount = currentRoadmapItems.filter(r => r.produtoId === produto.id).length;

        const column = document.createElement('div');
        column.className = 'kanban-column';
        column.style.borderTopColor = produto.cor;

        const iniciais = produto.nome.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();

        let itemsHtml = '';
        if (produtoItems.length === 0) {
            itemsHtml = '<div class="kanban-empty">Nenhum item disponível</div>';
        } else {
            produtoItems.forEach(item => {
                const isSelected = currentRoadmapItems.find(r => r.id === item.id);
                itemsHtml += `
                    <div class="kanban-item ${isSelected ? 'selected' : ''}" onclick="toggleRoadmapItem(${item.id})">
                        <h4>${item.titulo}</h4>
                        <p>${item.descricao || 'Sem descrição'}</p>
                        <div class="kanban-item-badges">
                            <span class="badge status">${item.status}</span>
                            <span class="badge prioridade ${item.prioridade.toLowerCase()}">${item.prioridade}</span>
                            ${item.dependeReceita ? '<span class="badge receita">⚠️ Receita</span>' : ''}
                        </div>
                    </div>
                `;
            });
        }

        column.innerHTML = `
            <div class="kanban-column-header">
                <div class="kanban-product-icon" style="background:${produto.cor}">
                    ${iniciais}
                </div>
                <div class="kanban-product-info">
                    <h3>${produto.nome}</h3>
                    <span>${produtoItems.length} ${produtoItems.length === 1 ? 'item' : 'itens'}</span>
                </div>
            </div>
            <div class="kanban-items">
                ${itemsHtml}
            </div>
            <div class="kanban-summary">
                <strong>${selectedCount}</strong>
                selecionado${selectedCount !== 1 ? 's' : ''}
            </div>
        `;

        columnsWrapper.appendChild(column);
    });

    kanban.appendChild(columnsWrapper);
}

function toggleRoadmapItem(itemId) {
    const roadmap = JSON.parse(localStorage.getItem('roadmap')) || [];
    const item = roadmap.find(r => r.id === itemId);

    if (!item) return;

    const existingIndex = currentRoadmapItems.findIndex(r => r.id === itemId);

    if (existingIndex >= 0) {
        // Remover
        currentRoadmapItems.splice(existingIndex, 1);
    } else {
        // Adicionar
        currentRoadmapItems.push(item);
    }

    // Atualizar ambas as visualizações
    renderAgendaRoadmap();
    renderAgendaRoadmapTimeline();
}

function removeRoadmapFromAgenda(itemId) {
    const index = currentRoadmapItems.findIndex(r => r.id === itemId);
    if (index >= 0) {
        currentRoadmapItems.splice(index, 1);
        renderAgendaRoadmap();
        renderAgendaRoadmapTimeline();
    }
}

// ===== TIMELINE VIEW =====
let currentRoadmapView = 'kanban';

function switchRoadmapView(view) {
    currentRoadmapView = view;

    // Atualizar botões
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });

    // Atualizar visualizações
    document.querySelectorAll('.roadmap-view').forEach(v => {
        v.classList.remove('active');
    });

    if (view === 'kanban') {
        document.getElementById('roadmapKanbanView').classList.add('active');
    } else {
        document.getElementById('roadmapTimelineView').classList.add('active');
        renderAgendaRoadmapTimeline();
    }
}

function renderAgendaRoadmapTimeline() {
    const timeline = document.getElementById('agendaRoadmapTimeline');
    const roadmap = JSON.parse(localStorage.getItem('roadmap')) || [];
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    timeline.innerHTML = '';

    // Filtrar apenas itens não concluídos/cancelados
    const activeItems = roadmap.filter(r => r.status !== 'Concluído' && r.status !== 'Cancelado');

    if (activeItems.length === 0) {
        timeline.innerHTML = `
            <div class="timeline-empty">
                <div class="timeline-empty-icon">📋</div>
                <div class="timeline-empty-text">Nenhum item de roadmap disponível</div>
            </div>
        `;
        return;
    }

    // Contador total
    const totalSelected = currentRoadmapItems.length;
    const counterDiv = document.createElement('div');
    counterDiv.className = 'timeline-counter';
    counterDiv.innerHTML = `
        <div class="timeline-counter-value">${totalSelected}</div>
        <div class="timeline-counter-label">item${totalSelected !== 1 ? 's' : ''} selecionado${totalSelected !== 1 ? 's' : ''} para esta agenda</div>
        <div class="timeline-counter-hint">💡 Clique nos itens para selecionar/desselecionar</div>
    `;
    timeline.appendChild(counterDiv);

    // Agrupar por status
    const statusGroups = {
        'Planejado': { icon: '📋', items: [] },
        'Em Desenvolvimento': { icon: '⚙️', items: [] },
        'Concluído': { icon: '✅', items: [] }
    };

    activeItems.forEach(item => {
        const status = item.status || 'Planejado';
        if (statusGroups[status]) {
            statusGroups[status].items.push(item);
        }
    });

    // Renderizar cada seção
    Object.keys(statusGroups).forEach(status => {
        const group = statusGroups[status];

        if (group.items.length === 0) return;

        const section = document.createElement('div');
        section.className = 'timeline-section';

        const statusClass = status.toLowerCase().replace(' ', '-').normalize('NFD').replace(/[̀-ͯ]/g, '');
        const selectedInSection = group.items.filter(item => currentRoadmapItems.find(r => r.id === item.id)).length;

        section.innerHTML = `
            <div class="timeline-section-header">
                <div class="timeline-status-icon ${statusClass}">
                    ${group.icon}
                </div>
                <div class="timeline-section-info">
                    <h3>${status}</h3>
                    <span>${group.items.length} ${group.items.length === 1 ? 'item' : 'itens'} • ${selectedInSection} selecionado${selectedInSection !== 1 ? 's' : ''}</span>
                </div>
            </div>
            <div class="timeline-items" id="timeline-${statusClass}">
            </div>
        `;

        timeline.appendChild(section);

        const itemsContainer = section.querySelector('.timeline-items');

        // Ordenar por previsão (se tiver) e depois prioridade
        const sortedItems = group.items.sort((a, b) => {
            // Priorizar por data de previsão
            if (a.previsao && b.previsao) {
                return new Date(a.previsao) - new Date(b.previsao);
            }
            if (a.previsao) return -1;
            if (b.previsao) return 1;

            // Depois por prioridade
            const prioOrder = { 'Crítica': 0, 'Alta': 1, 'Média': 2, 'Baixa': 3 };
            return (prioOrder[a.prioridade] || 2) - (prioOrder[b.prioridade] || 2);
        });

        sortedItems.forEach(item => {
            const isSelected = currentRoadmapItems.find(r => r.id === item.id);
            const produto = produtos.find(p => p.id === item.produtoId);
            const iniciais = produto ? produto.nome.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase() : 'TR';

            const itemDiv = document.createElement('div');
            itemDiv.className = `timeline-item ${isSelected ? 'selected' : ''}`;
            itemDiv.onclick = () => toggleRoadmapItem(item.id);

            let prioClass = '';
            if (item.prioridade === 'Crítica') prioClass = 'alta';
            else if (item.prioridade === 'Alta') prioClass = 'alta';

            itemDiv.innerHTML = `
                <div class="timeline-item-header">
                    <div class="timeline-item-title">
                        <h4>${item.titulo}</h4>
                        <div class="timeline-item-meta">
                            <div class="timeline-product-badge" style="background:${produto ? produto.cor : '#FF8000'}">
                                <div class="timeline-product-icon">${iniciais}</div>
                                ${produto ? produto.nome : 'Produto'}
                            </div>
                        </div>
                    </div>
                    <div class="timeline-check">✓</div>
                </div>
                ${item.descricao ? `<div class="timeline-item-description">${item.descricao}</div>` : ''}
                <div class="timeline-item-badges">
                    <span class="badge prioridade ${prioClass}">${item.prioridade}</span>
                    ${item.dependeReceita ? '<span class="badge receita">⚠️ Depende Receita</span>' : ''}
                    ${item.dependencias ? '<span class="badge" style="background:#E0E7FF;color:#3730A3">🔗 Tem Dependências</span>' : ''}
                </div>
                ${item.previsao ? `
                    <div class="timeline-date">
                        📅 Previsão de entrega: <strong>${formatDate(item.previsao)}</strong>
                    </div>
                ` : ''}
                ${item.dependencias ? `
                    <div class="timeline-date">
                        📌 Dependências: <strong>${item.dependencias}</strong>
                    </div>
                ` : ''}
            `;

            itemsContainer.appendChild(itemDiv);
        });
    });
}

// ===== ATA =====
document.addEventListener('DOMContentLoaded', () => {
    const ataTextarea = document.getElementById('agendaAta');
    if (ataTextarea) {
        ataTextarea.addEventListener('input', updateAtaCounter);
    }
});

function updateAtaCounter() {
    const ata = document.getElementById('agendaAta').value;
    document.getElementById('ataCharCount').textContent = ata.length;
}

// ===== POSTS =====
function togglePostReason(type) {
    const checkbox = document.getElementById(`post${type.charAt(0).toUpperCase() + type.slice(1)}`);
    const reasonDiv = document.getElementById(`reason${type.charAt(0).toUpperCase() + type.slice(1)}`);

    if (checkbox.checked) {
        reasonDiv.style.display = 'none';
    } else {
        reasonDiv.style.display = 'block';
    }
}

// ===== CONSULTORES =====
function loadConsultores() {
    const consultores = JSON.parse(localStorage.getItem('consultores'));
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

        // Cor do progresso
        let corProgresso = '#10B981'; // Verde
        if (percentualUsado >= 80) corProgresso = '#EF4444'; // Vermelho
        else if (percentualUsado >= 60) corProgresso = '#F59E0B'; // Amarelo

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
}

function openConsultorModal() {
    editingId = null;
    document.getElementById('consultorModalTitle').textContent = 'Novo Consultor';
    document.getElementById('consultorNome').value = '';
    document.getElementById('consultorEmail').value = '';
    document.getElementById('consultorTelefone').value = '';
    document.getElementById('consultorEspecialidade').value = '';
    document.getElementById('consultorAgendas').value = '20';
    document.getElementById('consultorMaxParticipantes').value = '10';
    document.getElementById('consultorStatus').value = 'Ativo';
    document.getElementById('consultorModal').classList.add('active');
}

function closeConsultorModal() {
    document.getElementById('consultorModal').classList.remove('active');
}

function editConsultor(id) {
    const consultores = JSON.parse(localStorage.getItem('consultores'));
    const consultor = consultores.find(c => c.id === id);

    if (consultor) {
        editingId = id;
        document.getElementById('consultorModalTitle').textContent = 'Editar Consultor';
        document.getElementById('consultorNome').value = consultor.nome;
        document.getElementById('consultorEmail').value = consultor.email;
        document.getElementById('consultorTelefone').value = consultor.telefone;
        document.getElementById('consultorEspecialidade').value = consultor.especialidade;
        document.getElementById('consultorAgendas').value = consultor.agendasDisponiveis;
        document.getElementById('consultorMaxParticipantes').value = consultor.maxParticipantes || 10;
        document.getElementById('consultorStatus').value = consultor.status;
        document.getElementById('consultorModal').classList.add('active');
    }
}

function saveConsultor() {
    const nome = document.getElementById('consultorNome').value.trim();
    const email = document.getElementById('consultorEmail').value.trim();
    const telefone = document.getElementById('consultorTelefone').value.trim();
    const especialidade = document.getElementById('consultorEspecialidade').value.trim();
    const agendasDisponiveis = parseInt(document.getElementById('consultorAgendas').value);
    const maxParticipantes = parseInt(document.getElementById('consultorMaxParticipantes').value);
    const status = document.getElementById('consultorStatus').value;

    if (!nome || !email) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    const consultores = JSON.parse(localStorage.getItem('consultores'));

    if (editingId) {
        const index = consultores.findIndex(c => c.id === editingId);
        consultores[index] = {
            ...consultores[index],
            nome,
            email,
            telefone,
            especialidade,
            agendasDisponiveis,
            maxParticipantes,
            status
        };
    } else {
        const newId = consultores.length > 0 ? Math.max(...consultores.map(c => c.id)) + 1 : 1;
        consultores.push({
            id: newId,
            nome,
            email,
            telefone,
            especialidade,
            agendasDisponiveis,
            agendasUsadas: 0,
            maxParticipantes,
            status
        });
    }

    localStorage.setItem('consultores', JSON.stringify(consultores));
    closeConsultorModal();
    loadConsultores();
    updateStats();
    populateSelects();
}

function deleteConsultor(id) {
    if (!confirm('Deseja realmente excluir este consultor?')) return;

    let consultores = JSON.parse(localStorage.getItem('consultores'));
    consultores = consultores.filter(c => c.id !== id);
    localStorage.setItem('consultores', JSON.stringify(consultores));
    loadConsultores();
    updateStats();
    populateSelects();
}

// ===== PRODUTOS =====
function loadProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const roadmap = JSON.parse(localStorage.getItem('roadmap'));
    const grid = document.getElementById('produtosGrid');
    grid.innerHTML = '';

    produtos.forEach(produto => {
        const itensCount = roadmap.filter(r => r.produtoId === produto.id).length;

        const div = document.createElement('div');
        div.className = 'produto-card';
        div.style.borderTopColor = produto.cor;

        div.innerHTML = `
            <div class="produto-header">
                <div class="produto-icon" style="background:${produto.cor}"></div>
                <div class="produto-info">
                    <h3>${produto.nome}</h3>
                    <p>${produto.categoria}</p>
                </div>
            </div>
            <p style="font-size:13px;color:#666;margin:12px 0;">${produto.descricao}</p>
            <div class="produto-stats">
                <strong>${itensCount}</strong> itens no roadmap
            </div>
            <div class="consultor-actions" style="margin-top:12px;">
                <button class="btn-secondary" onclick="editProduto(${produto.id})">✏️ Editar</button>
                <button class="btn-secondary" onclick="deleteProduto(${produto.id})">🗑️</button>
            </div>
        `;
        grid.appendChild(div);
    });
}

function openProdutoModal() {
    editingId = null;
    document.getElementById('produtoModalTitle').textContent = 'Novo Produto';
    document.getElementById('produtoNome').value = '';
    document.getElementById('produtoDescricao').value = '';
    document.getElementById('produtoCategoria').value = '';
    document.getElementById('produtoCor').value = '#FF8000';
    document.getElementById('produtoModal').classList.add('active');
}

function closeProdutoModal() {
    document.getElementById('produtoModal').classList.remove('active');
}

function editProduto(id) {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const produto = produtos.find(p => p.id === id);

    if (produto) {
        editingId = id;
        document.getElementById('produtoModalTitle').textContent = 'Editar Produto';
        document.getElementById('produtoNome').value = produto.nome;
        document.getElementById('produtoDescricao').value = produto.descricao;
        document.getElementById('produtoCategoria').value = produto.categoria;
        document.getElementById('produtoCor').value = produto.cor;
        document.getElementById('produtoModal').classList.add('active');
    }
}

function saveProduto() {
    const nome = document.getElementById('produtoNome').value.trim();
    const descricao = document.getElementById('produtoDescricao').value.trim();
    const categoria = document.getElementById('produtoCategoria').value.trim();
    const cor = document.getElementById('produtoCor').value;

    if (!nome) {
        alert('Preencha o nome do produto!');
        return;
    }

    const produtos = JSON.parse(localStorage.getItem('produtos'));

    if (editingId) {
        const index = produtos.findIndex(p => p.id === editingId);
        produtos[index] = {
            ...produtos[index],
            nome,
            descricao,
            categoria,
            cor
        };
    } else {
        const newId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
        produtos.push({
            id: newId,
            nome,
            descricao,
            categoria,
            cor
        });
    }

    localStorage.setItem('produtos', JSON.stringify(produtos));
    closeProdutoModal();
    loadProdutos();
    populateSelects();
}

function deleteProduto(id) {
    if (!confirm('Deseja realmente excluir este produto?')) return;

    let produtos = JSON.parse(localStorage.getItem('produtos'));
    produtos = produtos.filter(p => p.id !== id);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    loadProdutos();
    populateSelects();
}

// ===== ROADMAP =====
let currentMainRoadmapView = 'list';

function switchMainRoadmapView(view) {
    currentMainRoadmapView = view;

    // Atualizar botões
    const parent = event.target.closest('.view-toggle');
    if (parent) {
        parent.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });
    }

    // Atualizar visualizações
    document.querySelectorAll('.roadmap-main-view').forEach(v => {
        v.classList.remove('active');
    });

    if (view === 'list') {
        document.getElementById('roadmapListView').classList.add('active');
    } else {
        document.getElementById('roadmapTimelineMainView').classList.add('active');
        renderMainRoadmapTimeline();
    }
}

function renderMainRoadmapTimeline() {
    const timeline = document.getElementById('roadmapTimelineMain');
    const roadmap = JSON.parse(localStorage.getItem('roadmap')) || [];
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    timeline.innerHTML = '';

    if (roadmap.length === 0) {
        timeline.innerHTML = `
            <div class="timeline-empty">
                <div class="timeline-empty-icon">📋</div>
                <div class="timeline-empty-text">Nenhum item de roadmap cadastrado</div>
            </div>
        `;
        return;
    }

    // Estatísticas gerais
    const stats = {
        total: roadmap.length,
        planejado: roadmap.filter(r => r.status === 'Planejado').length,
        desenvolvimento: roadmap.filter(r => r.status === 'Em Desenvolvimento').length,
        concluido: roadmap.filter(r => r.status === 'Concluído').length,
        dependeReceita: roadmap.filter(r => r.dependeReceita).length
    };

    const statsDiv = document.createElement('div');
    statsDiv.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:30px;';
    statsDiv.innerHTML = `
        <div style="background:linear-gradient(135deg,#DBEAFE,#BFDBFE);padding:20px;border-radius:12px;text-align:center;">
            <div style="font-size:32px;font-weight:bold;color:#1E40AF;">${stats.total}</div>
            <div style="font-size:14px;color:#1E3A8A;margin-top:4px;">Total de Itens</div>
        </div>
        <div style="background:linear-gradient(135deg,#FEF3C7,#FDE68A);padding:20px;border-radius:12px;text-align:center;">
            <div style="font-size:32px;font-weight:bold;color:#92400E;">${stats.desenvolvimento}</div>
            <div style="font-size:14px;color:#78350F;margin-top:4px;">Em Desenvolvimento</div>
        </div>
        <div style="background:linear-gradient(135deg,#D1FAE5,#A7F3D0);padding:20px;border-radius:12px;text-align:center;">
            <div style="font-size:32px;font-weight:bold;color:#065F46;">${stats.concluido}</div>
            <div style="font-size:14px;color:#064E3B;margin-top:4px;">Concluídos</div>
        </div>
        <div style="background:linear-gradient(135deg,#FEE2E2,#FECACA);padding:20px;border-radius:12px;text-align:center;">
            <div style="font-size:32px;font-weight:bold;color:#991B1B;">${stats.dependeReceita}</div>
            <div style="font-size:14px;color:#7F1D1D;margin-top:4px;">Dependem da Receita</div>
        </div>
    `;
    timeline.appendChild(statsDiv);

    // Agrupar por status
    const statusGroups = {
        'Em Desenvolvimento': { icon: '⚙️', items: [], color: '#F59E0B' },
        'Planejado': { icon: '📋', items: [], color: '#3B82F6' },
        'Concluído': { icon: '✅', items: [], color: '#10B981' },
        'Cancelado': { icon: '❌', items: [], color: '#EF4444' }
    };

    roadmap.forEach(item => {
        const status = item.status || 'Planejado';
        if (statusGroups[status]) {
            statusGroups[status].items.push(item);
        }
    });

    // Renderizar cada seção (priorizando Em Desenvolvimento)
    const statusOrder = ['Em Desenvolvimento', 'Planejado', 'Concluído', 'Cancelado'];

    statusOrder.forEach(status => {
        const group = statusGroups[status];
        if (group.items.length === 0) return;

        const section = document.createElement('div');
        section.className = 'timeline-section';

        const statusClass = status.toLowerCase().replace(' ', '-').normalize('NFD').replace(/[̀-ͯ]/g, '');

        section.innerHTML = `
            <div class="timeline-section-header">
                <div class="timeline-status-icon ${statusClass}">
                    ${group.icon}
                </div>
                <div class="timeline-section-info">
                    <h3>${status}</h3>
                    <span>${group.items.length} ${group.items.length === 1 ? 'item' : 'itens'}</span>
                </div>
            </div>
            <div class="timeline-items" id="main-timeline-${statusClass}">
            </div>
        `;

        timeline.appendChild(section);

        const itemsContainer = section.querySelector('.timeline-items');

        // Ordenar por previsão e prioridade
        const sortedItems = group.items.sort((a, b) => {
            if (a.previsao && b.previsao) {
                return new Date(a.previsao) - new Date(b.previsao);
            }
            if (a.previsao) return -1;
            if (b.previsao) return 1;
            const prioOrder = { 'Crítica': 0, 'Alta': 1, 'Média': 2, 'Baixa': 3 };
            return (prioOrder[a.prioridade] || 2) - (prioOrder[b.prioridade] || 2);
        });

        sortedItems.forEach(item => {
            const produto = produtos.find(p => p.id === item.produtoId);
            const iniciais = produto ? produto.nome.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase() : 'TR';

            const itemDiv = document.createElement('div');
            itemDiv.className = 'timeline-item';
            itemDiv.style.cursor = 'default';

            let prioClass = '';
            if (item.prioridade === 'Crítica') prioClass = 'alta';
            else if (item.prioridade === 'Alta') prioClass = 'alta';

            itemDiv.innerHTML = `
                <div class="timeline-item-header">
                    <div class="timeline-item-title">
                        <h4>${item.titulo}</h4>
                        <div class="timeline-item-meta">
                            <div class="timeline-product-badge" style="background:${produto ? produto.cor : '#FF8000'}">
                                <div class="timeline-product-icon">${iniciais}</div>
                                ${produto ? produto.nome : 'Produto'}
                            </div>
                        </div>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-icon edit" onclick="editRoadmap(${item.id})" title="Editar">✏️</button>
                        <button class="btn-icon delete" onclick="deleteRoadmap(${item.id})" title="Excluir">🗑️</button>
                    </div>
                </div>
                ${item.descricao ? `<div class="timeline-item-description">${item.descricao}</div>` : ''}
                <div class="timeline-item-badges">
                    <span class="badge prioridade ${prioClass}">${item.prioridade}</span>
                    ${item.dependeReceita ? '<span class="badge receita">⚠️ Depende Receita</span>' : ''}
                    ${item.dependencias ? '<span class="badge" style="background:#E0E7FF;color:#3730A3">🔗 Tem Dependências</span>' : ''}
                </div>
                ${item.previsao ? `
                    <div class="timeline-date">
                        📅 Previsão de entrega: <strong>${formatDate(item.previsao)}</strong>
                    </div>
                ` : ''}
                ${item.dependencias ? `
                    <div class="timeline-date">
                        📌 Dependências: <strong>${item.dependencias}</strong>
                    </div>
                ` : ''}
            `;

            itemsContainer.appendChild(itemDiv);
        });
    });
}

function loadRoadmap() {
    const roadmap = JSON.parse(localStorage.getItem('roadmap'));
    const list = document.getElementById('roadmapList');
    list.innerHTML = '';

    roadmap.forEach(item => {
        const div = document.createElement('div');
        div.className = 'roadmap-item';

        let badges = `
            <span class="badge produto">${item.produtoNome}</span>
            <span class="badge status">${item.status}</span>
            <span class="badge prioridade ${item.prioridade.toLowerCase()}">${item.prioridade}</span>
        `;

        if (item.dependeReceita) {
            badges += '<span class="badge receita">⚠️ Depende Receita</span>';
        }

        div.innerHTML = `
            <div class="roadmap-header-info">
                <div style="flex:1;">
                    <h4>${item.titulo}</h4>
                    <p style="font-size:13px;color:#666;margin:4px 0;">${item.descricao || ''}</p>
                    ${item.dependencias ? `<p style="font-size:12px;color:#999;margin-top:4px;">📌 ${item.dependencias}</p>` : ''}
                    ${item.previsao ? `<p style="font-size:12px;color:#999;margin-top:4px;">📅 Previsão: ${formatDate(item.previsao)}</p>` : ''}
                    <div class="roadmap-badges">
                        ${badges}
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn-icon edit" onclick="editRoadmap(${item.id})">✏️</button>
                    <button class="btn-icon delete" onclick="deleteRoadmap(${item.id})">🗑️</button>
                </div>
            </div>
        `;
        list.appendChild(div);
    });
}

function filterRoadmap() {
    const filterProduto = document.getElementById('filterProdutoRoadmap').value;
    const filterStatus = document.getElementById('filterStatusRoadmap').value;

    const roadmap = JSON.parse(localStorage.getItem('roadmap'));
    const filtered = roadmap.filter(item => {
        const matchProduto = !filterProduto || item.produtoNome === filterProduto;
        const matchStatus = !filterStatus || item.status === filterStatus;
        return matchProduto && matchStatus;
    });

    const list = document.getElementById('roadmapList');
    list.innerHTML = '';

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'roadmap-item';

        let badges = `
            <span class="badge produto">${item.produtoNome}</span>
            <span class="badge status">${item.status}</span>
            <span class="badge prioridade ${item.prioridade.toLowerCase()}">${item.prioridade}</span>
        `;

        if (item.dependeReceita) {
            badges += '<span class="badge receita">⚠️ Depende Receita</span>';
        }

        div.innerHTML = `
            <div class="roadmap-header-info">
                <div style="flex:1;">
                    <h4>${item.titulo}</h4>
                    <p style="font-size:13px;color:#666;margin:4px 0;">${item.descricao || ''}</p>
                    ${item.dependencias ? `<p style="font-size:12px;color:#999;margin-top:4px;">📌 ${item.dependencias}</p>` : ''}
                    ${item.previsao ? `<p style="font-size:12px;color:#999;margin-top:4px;">📅 Previsão: ${formatDate(item.previsao)}</p>` : ''}
                    <div class="roadmap-badges">
                        ${badges}
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn-icon edit" onclick="editRoadmap(${item.id})">✏️</button>
                    <button class="btn-icon delete" onclick="deleteRoadmap(${item.id})">🗑️</button>
                </div>
            </div>
        `;
        list.appendChild(div);
    });
}

function openRoadmapModal() {
    editingId = null;
    document.getElementById('roadmapModalTitle').textContent = 'Novo Item Roadmap';
    document.getElementById('roadmapTitulo').value = '';
    document.getElementById('roadmapProduto').value = '';
    document.getElementById('roadmapStatus').value = 'Planejado';
    document.getElementById('roadmapDescricao').value = '';
    document.getElementById('roadmapPrioridade').value = 'Média';
    document.getElementById('roadmapPrevisao').value = '';
    document.getElementById('roadmapDependeReceita').checked = false;
    document.getElementById('roadmapDependencias').value = '';
    document.getElementById('roadmapModal').classList.add('active');
}

function closeRoadmapModal() {
    document.getElementById('roadmapModal').classList.remove('active');
}

function editRoadmap(id) {
    const roadmap = JSON.parse(localStorage.getItem('roadmap'));
    const item = roadmap.find(r => r.id === id);

    if (item) {
        editingId = id;
        document.getElementById('roadmapModalTitle').textContent = 'Editar Item Roadmap';
        document.getElementById('roadmapTitulo').value = item.titulo;
        document.getElementById('roadmapProduto').value = item.produtoId;
        document.getElementById('roadmapStatus').value = item.status;
        document.getElementById('roadmapDescricao').value = item.descricao || '';
        document.getElementById('roadmapPrioridade').value = item.prioridade;
        document.getElementById('roadmapPrevisao').value = item.previsao || '';
        document.getElementById('roadmapDependeReceita').checked = item.dependeReceita || false;
        document.getElementById('roadmapDependencias').value = item.dependencias || '';
        document.getElementById('roadmapModal').classList.add('active');
    }
}

function saveRoadmap() {
    const titulo = document.getElementById('roadmapTitulo').value.trim();
    const produtoId = parseInt(document.getElementById('roadmapProduto').value);
    const status = document.getElementById('roadmapStatus').value;
    const descricao = document.getElementById('roadmapDescricao').value.trim();
    const prioridade = document.getElementById('roadmapPrioridade').value;
    const previsao = document.getElementById('roadmapPrevisao').value;
    const dependeReceita = document.getElementById('roadmapDependeReceita').checked;
    const dependencias = document.getElementById('roadmapDependencias').value.trim();

    if (!titulo || !produtoId) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    const roadmap = JSON.parse(localStorage.getItem('roadmap'));
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const produto = produtos.find(p => p.id === produtoId);

    if (editingId) {
        const index = roadmap.findIndex(r => r.id === editingId);
        roadmap[index] = {
            ...roadmap[index],
            titulo,
            produtoId,
            produtoNome: produto.nome,
            status,
            descricao,
            prioridade,
            previsao,
            dependeReceita,
            dependencias
        };
    } else {
        const newId = roadmap.length > 0 ? Math.max(...roadmap.map(r => r.id)) + 1 : 1;
        roadmap.push({
            id: newId,
            titulo,
            produtoId,
            produtoNome: produto.nome,
            descricao,
            status,
            prioridade,
            previsao,
            dependeReceita,
            dependencias,
            agendaId: null
        });
    }

    localStorage.setItem('roadmap', JSON.stringify(roadmap));
    closeRoadmapModal();
    loadRoadmap();
    updateStats();
}

function deleteRoadmap(id) {
    if (!confirm('Deseja realmente excluir este item?')) return;

    let roadmap = JSON.parse(localStorage.getItem('roadmap'));
    roadmap = roadmap.filter(r => r.id !== id);
    localStorage.setItem('roadmap', JSON.stringify(roadmap));
    loadRoadmap();
    updateStats();
}

// ===== TEMAS =====
function loadTemas() {
    const temas = JSON.parse(localStorage.getItem('temas'));
    const agendas = JSON.parse(localStorage.getItem('agendas'));

    temas.forEach(tema => {
        tema.count = agendas.filter(a => a.tema === tema.nome).length;
    });

    const list = document.getElementById('temasList');
    list.innerHTML = '';

    temas.forEach(tema => {
        const div = document.createElement('div');
        div.className = 'tema-item';
        div.style.borderLeftColor = tema.cor;

        div.innerHTML = `
            <div class="tema-color" style="background:${tema.cor}"></div>
            <div class="tema-info">
                <h3>${tema.nome}</h3>
                <p>${tema.descricao}</p>
            </div>
            <span class="tema-count">${tema.count} agendas</span>
            <div class="action-buttons">
                <button class="btn-icon edit" onclick="editTema(${tema.id})">✏️</button>
                <button class="btn-icon delete" onclick="deleteTema(${tema.id})">🗑️</button>
            </div>
        `;
        list.appendChild(div);
    });
}

function openTemaModal() {
    editingId = null;
    document.getElementById('temaModalTitle').textContent = 'Novo Tema';
    document.getElementById('temaNome').value = '';
    document.getElementById('temaDescricao').value = '';
    document.getElementById('temaCor').value = '#FF8000';
    document.getElementById('temaModal').classList.add('active');
}

function closeTemaModal() {
    document.getElementById('temaModal').classList.remove('active');
}

function editTema(id) {
    const temas = JSON.parse(localStorage.getItem('temas'));
    const tema = temas.find(t => t.id === id);

    if (tema) {
        editingId = id;
        document.getElementById('temaModalTitle').textContent = 'Editar Tema';
        document.getElementById('temaNome').value = tema.nome;
        document.getElementById('temaDescricao').value = tema.descricao;
        document.getElementById('temaCor').value = tema.cor;
        document.getElementById('temaModal').classList.add('active');
    }
}

function saveTema() {
    const nome = document.getElementById('temaNome').value.trim();
    const descricao = document.getElementById('temaDescricao').value.trim();
    const cor = document.getElementById('temaCor').value;

    if (!nome) {
        alert('Preencha o nome do tema!');
        return;
    }

    const temas = JSON.parse(localStorage.getItem('temas'));

    if (editingId) {
        const index = temas.findIndex(t => t.id === editingId);
        temas[index] = {
            ...temas[index],
            nome,
            descricao,
            cor
        };
    } else {
        const newId = temas.length > 0 ? Math.max(...temas.map(t => t.id)) + 1 : 1;
        temas.push({
            id: newId,
            nome,
            descricao,
            cor,
            count: 0
        });
    }

    localStorage.setItem('temas', JSON.stringify(temas));
    closeTemaModal();
    loadTemas();
    populateSelects();
}

function deleteTema(id) {
    if (!confirm('Deseja realmente excluir este tema?')) return;

    let temas = JSON.parse(localStorage.getItem('temas'));
    temas = temas.filter(t => t.id !== id);
    localStorage.setItem('temas', JSON.stringify(temas));
    loadTemas();
    populateSelects();
}

// ===== RELATÓRIOS =====
function loadRelatorios() {
    console.log('Relatórios carregados - Integração com Chart.js pode ser adicionada');
}

// ===== RECÁLCULO DE AGENDAS =====
function recalcularAgendasConsultores() {
    const agendas = JSON.parse(localStorage.getItem('agendas')) || [];
    const consultores = JSON.parse(localStorage.getItem('consultores')) || [];

    // Pegar mês/ano atual
    const hoje = new Date();
    const mesAtual = hoje.getMonth(); // 0-11
    const anoAtual = hoje.getFullYear();

    // Resetar contadores de todos os consultores
    consultores.forEach(consultor => {
        consultor.agendasUsadas = 0;
    });

    // Contar agendas do mês atual que não foram canceladas
    agendas.forEach(agenda => {
        if (!agenda.data) return;

        const dataAgenda = new Date(agenda.data + 'T00:00:00');
        const mesAgenda = dataAgenda.getMonth();
        const anoAgenda = dataAgenda.getFullYear();

        // Verificar se é do mês/ano atual
        const isMesAtual = mesAgenda === mesAtual && anoAgenda === anoAtual;

        // Contar apenas agendas do mês atual com status válido
        const statusValidos = ['Agendada', 'Realizada'];
        if (isMesAtual && statusValidos.includes(agenda.status)) {
            const consultor = consultores.find(c => c.id === agenda.consultorId);
            if (consultor) {
                consultor.agendasUsadas++;
            }
        }
    });

    // Salvar consultores atualizados
    localStorage.setItem('consultores', JSON.stringify(consultores));

    // Recarregar display se necessário
    if (document.getElementById('consultoresGrid')) {
        loadConsultores();
    }
}

// ===== HELPERS =====
function populateSelects() {
    const consultores = JSON.parse(localStorage.getItem('consultores'));
    const temas = JSON.parse(localStorage.getItem('temas'));
    const produtos = JSON.parse(localStorage.getItem('produtos'));

    // Select de consultor
    const agendaConsultorSelect = document.getElementById('agendaConsultor');
    agendaConsultorSelect.innerHTML = '<option value="">Selecione...</option>';
    consultores.filter(c => c.status === 'Ativo').forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = `${c.nome} - ${c.especialidade}`;
        agendaConsultorSelect.appendChild(option);
    });

    // Select de tema
    const agendaTemaSelect = document.getElementById('agendaTema');
    agendaTemaSelect.innerHTML = '<option value="">Selecione...</option>';
    temas.forEach(t => {
        const option = document.createElement('option');
        option.value = t.nome;
        option.textContent = t.nome;
        agendaTemaSelect.appendChild(option);
    });

    // Filtro de consultor
    const filterConsultorSelect = document.getElementById('filterConsultor');
    filterConsultorSelect.innerHTML = '<option value="">Todos os Consultores</option>';
    consultores.forEach(c => {
        const option = document.createElement('option');
        option.value = c.nome;
        option.textContent = c.nome;
        filterConsultorSelect.appendChild(option);
    });

    // Select de produto no roadmap
    const roadmapProdutoSelect = document.getElementById('roadmapProduto');
    roadmapProdutoSelect.innerHTML = '<option value="">Selecione...</option>';
    produtos.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.nome;
        roadmapProdutoSelect.appendChild(option);
    });

    // Filtro de produto no roadmap
    const filterProdutoSelect = document.getElementById('filterProdutoRoadmap');
    filterProdutoSelect.innerHTML = '<option value="">Todos os Produtos</option>';
    produtos.forEach(p => {
        const option = document.createElement('option');
        option.value = p.nome;
        option.textContent = p.nome;
        filterProdutoSelect.appendChild(option);
    });
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initApp();

    document.getElementById('password')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});

document.addEventListener('submit', (e) => {
    e.preventDefault();
});
// ===== GERENCIAMENTO DE USUÁRIOS (APENAS ADMIN) =====
let editingUserId = null;

function openUsuariosModal() {
    if (currentUser.perfil !== 'admin') {
        alert('Apenas administradores podem gerenciar usuários!');
        return;
    }
    loadUsuarios();
    document.getElementById('usuariosModal').classList.add('active');
}

function closeUsuariosModal() {
    document.getElementById('usuariosModal').classList.remove('active');
    document.getElementById('novoUsuarioForm').style.display = 'none';
    limparFormularioUsuario();
}

function loadUsuarios() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.getElementById('usuariosTableBody');
    tbody.innerHTML = '';
    users.forEach((user) => {
        const perfilBadge = user.perfil === 'admin' ? '<span class="status-badge agendada">👑 Admin</span>' : '<span class="status-badge realizada">👤 Usuário</span>';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${user.name}</strong></td>
            <td>${user.username}</td>
            <td>${perfilBadge}</td>
            <td><div class="action-buttons"><button class="btn-icon edit" onclick="editarUsuario('${user.username}')" title="Editar">✏️</button><button class="btn-icon delete" onclick="excluirUsuario('${user.username}')" title="Excluir" ${user.username === 'admin' ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>🗑️</button></div></td>
        `;
        tbody.appendChild(tr);
    });
}

function openNovoUsuarioForm() {
    document.getElementById('novoUsuarioForm').style.display = 'block';
    limparFormularioUsuario();
}

function cancelarNovoUsuario() {
    document.getElementById('novoUsuarioForm').style.display = 'none';
    limparFormularioUsuario();
}

function limparFormularioUsuario() {
    document.getElementById('novoUsuarioNome').value = '';
    document.getElementById('novoUsuarioUsername').value = '';
    document.getElementById('novoUsuarioPassword').value = '';
    document.getElementById('novoUsuarioPasswordConfirm').value = '';
    document.getElementById('novoUsuarioPerfil').value = 'user';
    document.getElementById('usuarioError').textContent = '';
    document.getElementById('usuarioError').classList.remove('show');
}

function salvarNovoUsuario() {
    const nome = document.getElementById('novoUsuarioNome').value.trim();
    const username = document.getElementById('novoUsuarioUsername').value.trim();
    const password = document.getElementById('novoUsuarioPassword').value;
    const passwordConfirm = document.getElementById('novoUsuarioPasswordConfirm').value;
    const perfil = document.getElementById('novoUsuarioPerfil').value;
    const errorDiv = document.getElementById('usuarioError');
    if (!nome || !username || !password) {
        errorDiv.textContent = 'Preencha todos os campos obrigatórios!';
        errorDiv.classList.add('show');
        return;
    }
    if (username.length < 3) {
        errorDiv.textContent = 'Usuário deve ter no mínimo 3 caracteres!';
        errorDiv.classList.add('show');
        return;
    }
    if (password.length < 6) {
        errorDiv.textContent = 'Senha deve ter no mínimo 6 caracteres!';
        errorDiv.classList.add('show');
        return;
    }
    if (password !== passwordConfirm) {
        errorDiv.textContent = 'As senhas não conferem!';
        errorDiv.classList.add('show');
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
        errorDiv.textContent = 'Este usuário já existe!';
        errorDiv.classList.add('show');
        return;
    }
    users.push({ username: username, password: password, name: nome, perfil: perfil });
    localStorage.setItem('users', JSON.stringify(users));
    alert('✅ Usuário cadastrado com sucesso!');
    cancelarNovoUsuario();
    loadUsuarios();
}

function editarUsuario(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);
    if (!user) return;
    editingUserId = username;
    document.getElementById('editUsuarioNome').value = user.name;
    document.getElementById('editUsuarioUsername').value = user.username;
    document.getElementById('editUsuarioPassword').value = '';
    document.getElementById('editUsuarioPasswordConfirm').value = '';
    document.getElementById('editUsuarioPerfil').value = user.perfil || 'user';
    document.getElementById('editUsuarioError').textContent = '';
    document.getElementById('editUsuarioError').classList.remove('show');
    document.getElementById('editarUsuarioModal').classList.add('active');
}

function closeEditarUsuarioModal() {
    document.getElementById('editarUsuarioModal').classList.remove('active');
    editingUserId = null;
}

function salvarEdicaoUsuario() {
    const nome = document.getElementById('editUsuarioNome').value.trim();
    const password = document.getElementById('editUsuarioPassword').value;
    const passwordConfirm = document.getElementById('editUsuarioPasswordConfirm').value;
    const perfil = document.getElementById('editUsuarioPerfil').value;
    const errorDiv = document.getElementById('editUsuarioError');
    if (!nome) {
        errorDiv.textContent = 'Nome não pode estar vazio!';
        errorDiv.classList.add('show');
        return;
    }
    if (password) {
        if (password.length < 6) {
            errorDiv.textContent = 'Nova senha deve ter no mínimo 6 caracteres!';
            errorDiv.classList.add('show');
            return;
        }
        if (password !== passwordConfirm) {
            errorDiv.textContent = 'As senhas não conferem!';
            errorDiv.classList.add('show');
            return;
        }
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(u => u.username === editingUserId);
    if (index >= 0) {
        users[index].name = nome;
        users[index].perfil = perfil;
        if (password) users[index].password = password;
        localStorage.setItem('users', JSON.stringify(users));
        if (editingUserId === currentUser.username) {
            currentUser.name = nome;
            currentUser.perfil = perfil;
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            document.getElementById('currentUser').textContent = nome;
        }
        alert('✅ Usuário atualizado com sucesso!');
        closeEditarUsuarioModal();
        loadUsuarios();
    }
}

function excluirUsuario(username) {
    if (username === 'admin') {
        alert('❌ O usuário admin não pode ser excluído!');
        return;
    }
    if (username === currentUser.username) {
        alert('❌ Você não pode excluir seu próprio usuário!');
        return;
    }
    if (!confirm(`Deseja realmente excluir o usuário "${username}"?`)) return;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(u => u.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    alert('✅ Usuário excluído com sucesso!');
    loadUsuarios();
}
