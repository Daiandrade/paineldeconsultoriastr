// ===== SERVER.JS - Backend API para Painel de Consultorias TR =====
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { promisify } = require('util');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'tr-sped-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Conectar ao banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao banco:', err);
    } else {
        console.log('✅ Conectado ao banco SQLite');
    }
});

// Promisify das funções do banco
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));
const dbRun = promisify(db.run.bind(db));

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

// ===== ROTAS DE AUTENTICAÇÃO =====

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
        }

        const user = await dbGet('SELECT * FROM users WHERE username = ?', [username]);

        if (!user) {
            return res.status(401).json({ error: 'Usuário ou senha incorretos' });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Usuário ou senha incorretos' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, perfil: user.perfil },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                perfil: user.perfil
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// ===== ROTAS DE USUÁRIOS =====

// Listar usuários (apenas admin)
app.get('/api/users', authenticateToken, (req, res) => {
    try {
        if (req.user.perfil !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        const users = db.prepare('SELECT id, username, name, perfil FROM users').all();
        res.json(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
});

// Criar usuário (apenas admin)
app.post('/api/users', authenticateToken, (req, res) => {
    try {
        if (req.user.perfil !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        const { username, password, name, perfil } = req.body;

        if (!username || !password || !name) {
            return res.status(400).json({ error: 'Dados incompletos' });
        }

        const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const result = db.prepare('INSERT INTO users (username, password, name, perfil) VALUES (?, ?, ?, ?)').run(
            username,
            hashedPassword,
            name,
            perfil || 'user'
        );

        res.json({ id: result.lastInsertRowid, username, name, perfil: perfil || 'user' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Atualizar usuário (apenas admin)
app.put('/api/users/:id', authenticateToken, (req, res) => {
    try {
        if (req.user.perfil !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        const { id } = req.params;
        const { name, perfil, password } = req.body;

        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            db.prepare('UPDATE users SET name = ?, perfil = ?, password = ? WHERE id = ?').run(name, perfil, hashedPassword, id);
        } else {
            db.prepare('UPDATE users SET name = ?, perfil = ? WHERE id = ?').run(name, perfil, id);
        }

        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// Deletar usuário (apenas admin)
app.delete('/api/users/:id', authenticateToken, (req, res) => {
    try {
        if (req.user.perfil !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        const { id } = req.params;

        if (parseInt(id) === 1) {
            return res.status(400).json({ error: 'Não é possível excluir o administrador principal' });
        }

        db.prepare('DELETE FROM users WHERE id = ?').run(id);
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

// ===== ROTAS DE CONSULTORES =====

app.get('/api/consultores', authenticateToken, (req, res) => {
    try {
        const consultores = db.prepare('SELECT * FROM consultores ORDER BY nome').all();
        res.json(consultores);
    } catch (error) {
        console.error('Erro ao listar consultores:', error);
        res.status(500).json({ error: 'Erro ao listar consultores' });
    }
});

app.post('/api/consultores', authenticateToken, (req, res) => {
    try {
        const { nome, email, telefone, especialidade, agendasDisponiveis, maxParticipantes, status } = req.body;

        const result = db.prepare(`
            INSERT INTO consultores (nome, email, telefone, especialidade, agendasDisponiveis, agendasUsadas, maxParticipantes, status)
            VALUES (?, ?, ?, ?, ?, 0, ?, ?)
        `).run(nome, email, telefone, especialidade, agendasDisponiveis, maxParticipantes, status);

        res.json({ id: result.lastInsertRowid, ...req.body, agendasUsadas: 0 });
    } catch (error) {
        console.error('Erro ao criar consultor:', error);
        res.status(500).json({ error: 'Erro ao criar consultor' });
    }
});

app.put('/api/consultores/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, especialidade, agendasDisponiveis, maxParticipantes, status } = req.body;

        db.prepare(`
            UPDATE consultores
            SET nome = ?, email = ?, telefone = ?, especialidade = ?, agendasDisponiveis = ?, maxParticipantes = ?, status = ?
            WHERE id = ?
        `).run(nome, email, telefone, especialidade, agendasDisponiveis, maxParticipantes, status, id);

        res.json({ message: 'Consultor atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar consultor:', error);
        res.status(500).json({ error: 'Erro ao atualizar consultor' });
    }
});

app.delete('/api/consultores/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM consultores WHERE id = ?').run(id);
        res.json({ message: 'Consultor excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar consultor:', error);
        res.status(500).json({ error: 'Erro ao deletar consultor' });
    }
});

// ===== ROTAS DE PRODUTOS =====

app.get('/api/produtos', authenticateToken, (req, res) => {
    try {
        const produtos = db.prepare('SELECT * FROM produtos ORDER BY nome').all();
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ error: 'Erro ao listar produtos' });
    }
});

app.post('/api/produtos', authenticateToken, (req, res) => {
    try {
        const { nome, descricao, categoria, cor } = req.body;

        const result = db.prepare('INSERT INTO produtos (nome, descricao, categoria, cor) VALUES (?, ?, ?, ?)').run(
            nome, descricao, categoria, cor
        );

        res.json({ id: result.lastInsertRowid, ...req.body });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

app.put('/api/produtos/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, categoria, cor } = req.body;

        db.prepare('UPDATE produtos SET nome = ?, descricao = ?, categoria = ?, cor = ? WHERE id = ?').run(
            nome, descricao, categoria, cor, id
        );

        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

app.delete('/api/produtos/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM produtos WHERE id = ?').run(id);
        res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
});

// ===== ROTAS DE TEMAS =====

app.get('/api/temas', authenticateToken, (req, res) => {
    try {
        const temas = db.prepare('SELECT * FROM temas ORDER BY nome').all();
        res.json(temas);
    } catch (error) {
        console.error('Erro ao listar temas:', error);
        res.status(500).json({ error: 'Erro ao listar temas' });
    }
});

app.post('/api/temas', authenticateToken, (req, res) => {
    try {
        const { nome, descricao, cor } = req.body;

        const result = db.prepare('INSERT INTO temas (nome, descricao, cor) VALUES (?, ?, ?)').run(nome, descricao, cor);

        res.json({ id: result.lastInsertRowid, ...req.body });
    } catch (error) {
        console.error('Erro ao criar tema:', error);
        res.status(500).json({ error: 'Erro ao criar tema' });
    }
});

app.put('/api/temas/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, cor } = req.body;

        db.prepare('UPDATE temas SET nome = ?, descricao = ?, cor = ? WHERE id = ?').run(nome, descricao, cor, id);

        res.json({ message: 'Tema atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar tema:', error);
        res.status(500).json({ error: 'Erro ao atualizar tema' });
    }
});

app.delete('/api/temas/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM temas WHERE id = ?').run(id);
        res.json({ message: 'Tema excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar tema:', error);
        res.status(500).json({ error: 'Erro ao deletar tema' });
    }
});

// ===== ROTAS DE ROADMAP =====

app.get('/api/roadmap', authenticateToken, (req, res) => {
    try {
        const roadmap = db.prepare('SELECT * FROM roadmap ORDER BY previsao, prioridade').all();
        res.json(roadmap);
    } catch (error) {
        console.error('Erro ao listar roadmap:', error);
        res.status(500).json({ error: 'Erro ao listar roadmap' });
    }
});

app.post('/api/roadmap', authenticateToken, (req, res) => {
    try {
        const { titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita, dependencias } = req.body;

        const result = db.prepare(`
            INSERT INTO roadmap (titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita, dependencias)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita ? 1 : 0, dependencias);

        res.json({ id: result.lastInsertRowid, ...req.body });
    } catch (error) {
        console.error('Erro ao criar item roadmap:', error);
        res.status(500).json({ error: 'Erro ao criar item roadmap' });
    }
});

app.put('/api/roadmap/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita, dependencias } = req.body;

        db.prepare(`
            UPDATE roadmap
            SET titulo = ?, produtoId = ?, produtoNome = ?, descricao = ?, status = ?, prioridade = ?, previsao = ?, dependeReceita = ?, dependencias = ?
            WHERE id = ?
        `).run(titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita ? 1 : 0, dependencias, id);

        res.json({ message: 'Item roadmap atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar item roadmap:', error);
        res.status(500).json({ error: 'Erro ao atualizar item roadmap' });
    }
});

app.delete('/api/roadmap/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM roadmap WHERE id = ?').run(id);
        res.json({ message: 'Item roadmap excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar item roadmap:', error);
        res.status(500).json({ error: 'Erro ao deletar item roadmap' });
    }
});

// ===== ROTAS DE AGENDAS =====

app.get('/api/agendas', authenticateToken, (req, res) => {
    try {
        const agendas = db.prepare('SELECT * FROM agendas ORDER BY data DESC, hora DESC').all();

        // Parse JSON fields
        agendas.forEach(agenda => {
            agenda.participantes = JSON.parse(agenda.participantes || '[]');
            agenda.roadmapItems = JSON.parse(agenda.roadmapItems || '[]');
            agenda.postLinkedin = Boolean(agenda.postLinkedin);
            agenda.postInterno = Boolean(agenda.postInterno);
        });

        res.json(agendas);
    } catch (error) {
        console.error('Erro ao listar agendas:', error);
        res.status(500).json({ error: 'Erro ao listar agendas' });
    }
});

app.post('/api/agendas', authenticateToken, (req, res) => {
    try {
        const {
            consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
            participantes, roadmapItems, ata, postLinkedin, postLinkedinMotivo, postInterno, postInternoMotivo
        } = req.body;

        const result = db.prepare(`
            INSERT INTO agendas (
                consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
                participantes, roadmapItems, ata, postLinkedin, postLinkedinMotivo, postInterno, postInternoMotivo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
            JSON.stringify(participantes || []),
            JSON.stringify(roadmapItems || []),
            ata || '',
            postLinkedin ? 1 : 0,
            postLinkedinMotivo || '',
            postInterno ? 1 : 0,
            postInternoMotivo || ''
        );

        // Recalcular agendas usadas do consultor
        recalcularAgendasConsultor(consultorId);

        res.json({ id: result.lastInsertRowid, ...req.body });
    } catch (error) {
        console.error('Erro ao criar agenda:', error);
        res.status(500).json({ error: 'Erro ao criar agenda' });
    }
});

app.put('/api/agendas/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        const {
            consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
            participantes, roadmapItems, ata, postLinkedin, postLinkedinMotivo, postInterno, postInternoMotivo
        } = req.body;

        db.prepare(`
            UPDATE agendas SET
                consultorId = ?, consultorNome = ?, cliente = ?, data = ?, hora = ?, tema = ?, status = ?, duracao = ?, observacoes = ?,
                participantes = ?, roadmapItems = ?, ata = ?, postLinkedin = ?, postLinkedinMotivo = ?, postInterno = ?, postInternoMotivo = ?
            WHERE id = ?
        `).run(
            consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
            JSON.stringify(participantes || []),
            JSON.stringify(roadmapItems || []),
            ata || '',
            postLinkedin ? 1 : 0,
            postLinkedinMotivo || '',
            postInterno ? 1 : 0,
            postInternoMotivo || '',
            id
        );

        // Recalcular agendas usadas do consultor
        recalcularAgendasConsultor(consultorId);

        res.json({ message: 'Agenda atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar agenda:', error);
        res.status(500).json({ error: 'Erro ao atualizar agenda' });
    }
});

app.delete('/api/agendas/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;

        // Pegar consultorId antes de deletar
        const agenda = db.prepare('SELECT consultorId FROM agendas WHERE id = ?').get(id);

        db.prepare('DELETE FROM agendas WHERE id = ?').run(id);

        // Recalcular agendas usadas do consultor
        if (agenda) {
            recalcularAgendasConsultor(agenda.consultorId);
        }

        res.json({ message: 'Agenda excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar agenda:', error);
        res.status(500).json({ error: 'Erro ao deletar agenda' });
    }
});

// Função auxiliar para recalcular agendas usadas
function recalcularAgendasConsultor(consultorId) {
    try {
        const hoje = new Date();
        const mesAtual = hoje.getMonth() + 1;
        const anoAtual = hoje.getFullYear();

        const count = db.prepare(`
            SELECT COUNT(*) as total
            FROM agendas
            WHERE consultorId = ?
            AND strftime('%m', data) = ?
            AND strftime('%Y', data) = ?
            AND (status = 'Agendada' OR status = 'Realizada')
        `).get(consultorId, mesAtual.toString().padStart(2, '0'), anoAtual.toString());

        db.prepare('UPDATE consultores SET agendasUsadas = ? WHERE id = ?').run(count.total, consultorId);
    } catch (error) {
        console.error('Erro ao recalcular agendas:', error);
    }
}

// ===== ROTA DE ESTATÍSTICAS =====

app.get('/api/stats', authenticateToken, (req, res) => {
    try {
        const hoje = new Date().toISOString().split('T')[0];
        const mesAtual = new Date().getMonth() + 1;
        const anoAtual = new Date().getFullYear();

        const agendasHoje = db.prepare(`
            SELECT COUNT(*) as total FROM agendas
            WHERE data = ? AND status = 'Agendada'
        `).get(hoje).total;

        const agendasMes = db.prepare(`
            SELECT COUNT(*) as total FROM agendas
            WHERE strftime('%m', data) = ?
            AND strftime('%Y', data) = ?
            AND (status = 'Agendada' OR status = 'Realizada')
        `).get(mesAtual.toString().padStart(2, '0'), anoAtual.toString()).total;

        const consultoresAtivos = db.prepare(`
            SELECT COUNT(*) as total FROM consultores WHERE status = 'Ativo'
        `).get().total;

        const capacidade = db.prepare(`
            SELECT
                SUM(agendasDisponiveis) as total,
                SUM(agendasUsadas) as usadas
            FROM consultores WHERE status = 'Ativo'
        `).get();

        res.json({
            agendasHoje,
            agendasMes,
            consultoresAtivos,
            capacidadeTotal: capacidade.total || 0,
            capacidadeUsada: capacidade.usadas || 0,
            capacidadeRestante: (capacidade.total || 0) - (capacidade.usadas || 0)
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
});

// Servir index.html para todas as rotas não-API
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Acesse: http://localhost:${PORT}`);
    console.log(`🔑 JWT Secret configurado: ${JWT_SECRET !== 'tr-sped-secret-key-change-in-production' ? 'SIM ✅' : 'NÃO ⚠️ (use .env)'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close();
    console.log('\n👋 Servidor encerrado');
    process.exit(0);
});
