const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@libsql/client');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'tr-sped-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao Turso
const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// Helper functions
async function dbGet(sql, params = []) {
    const result = await db.execute(sql, params);
    return result.rows[0] || null;
}

async function dbAll(sql, params = []) {
    const result = await db.execute(sql, params);
    return result.rows;
}

async function dbRun(sql, params = []) {
    const result = await db.execute(sql, params);
    return {
        lastID: result.lastInsertRowid,
        changes: result.rowsAffected
    };
}

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

app.post('/auth/login', async (req, res) => {
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

// ===== ROTAS DE CONSULTORES =====

app.get('/consultores', authenticateToken, async (req, res) => {
    try {
        const consultores = await dbAll('SELECT * FROM consultores ORDER BY nome');
        res.json(consultores);
    } catch (error) {
        console.error('Erro ao listar consultores:', error);
        res.status(500).json({ error: 'Erro ao listar consultores' });
    }
});

app.post('/consultores', authenticateToken, async (req, res) => {
    try {
        const { nome, email, telefone, especialidade, agendasDisponiveis, maxParticipantes, status } = req.body;

        const result = await dbRun(`
            INSERT INTO consultores (nome, email, telefone, especialidade, agendasDisponiveis, agendasUsadas, maxParticipantes, status)
            VALUES (?, ?, ?, ?, ?, 0, ?, ?)
        `, [nome, email, telefone, especialidade, agendasDisponiveis, maxParticipantes, status]);

        res.json({ id: result.lastID, ...req.body, agendasUsadas: 0 });
    } catch (error) {
        console.error('Erro ao criar consultor:', error);
        res.status(500).json({ error: 'Erro ao criar consultor' });
    }
});

app.put('/consultores/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, especialidade, agendasDisponiveis, maxParticipantes, status } = req.body;

        await dbRun(`
            UPDATE consultores
            SET nome = ?, email = ?, telefone = ?, especialidade = ?, agendasDisponiveis = ?, maxParticipantes = ?, status = ?
            WHERE id = ?
        `, [nome, email, telefone, especialidade, agendasDisponiveis, maxParticipantes, status, id]);

        res.json({ message: 'Consultor atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar consultor:', error);
        res.status(500).json({ error: 'Erro ao atualizar consultor' });
    }
});

app.delete('/consultores/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await dbRun('DELETE FROM consultores WHERE id = ?', [id]);
        res.json({ message: 'Consultor excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar consultor:', error);
        res.status(500).json({ error: 'Erro ao deletar consultor' });
    }
});

// ===== ROTAS DE PRODUTOS =====

app.get('/produtos', authenticateToken, async (req, res) => {
    try {
        const produtos = await dbAll('SELECT * FROM produtos ORDER BY nome');
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ error: 'Erro ao listar produtos' });
    }
});

app.post('/produtos', authenticateToken, async (req, res) => {
    try {
        const { nome, descricao, categoria, cor } = req.body;
        const result = await dbRun('INSERT INTO produtos (nome, descricao, categoria, cor) VALUES (?, ?, ?, ?)',
            [nome, descricao, categoria, cor]);
        res.json({ id: result.lastID, ...req.body });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

app.put('/produtos/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, categoria, cor } = req.body;
        await dbRun('UPDATE produtos SET nome = ?, descricao = ?, categoria = ?, cor = ? WHERE id = ?',
            [nome, descricao, categoria, cor, id]);
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

app.delete('/produtos/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await dbRun('DELETE FROM produtos WHERE id = ?', [id]);
        res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
});

// ===== ROTAS DE TEMAS =====

app.get('/temas', authenticateToken, async (req, res) => {
    try {
        const temas = await dbAll('SELECT * FROM temas ORDER BY nome');
        res.json(temas);
    } catch (error) {
        console.error('Erro ao listar temas:', error);
        res.status(500).json({ error: 'Erro ao listar temas' });
    }
});

app.post('/temas', authenticateToken, async (req, res) => {
    try {
        const { nome, descricao, cor } = req.body;
        const result = await dbRun('INSERT INTO temas (nome, descricao, cor) VALUES (?, ?, ?)', [nome, descricao, cor]);
        res.json({ id: result.lastID, ...req.body });
    } catch (error) {
        console.error('Erro ao criar tema:', error);
        res.status(500).json({ error: 'Erro ao criar tema' });
    }
});

app.put('/temas/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, cor } = req.body;
        await dbRun('UPDATE temas SET nome = ?, descricao = ?, cor = ? WHERE id = ?', [nome, descricao, cor, id]);
        res.json({ message: 'Tema atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar tema:', error);
        res.status(500).json({ error: 'Erro ao atualizar tema' });
    }
});

app.delete('/temas/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await dbRun('DELETE FROM temas WHERE id = ?', [id]);
        res.json({ message: 'Tema excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar tema:', error);
        res.status(500).json({ error: 'Erro ao deletar tema' });
    }
});

// ===== ROTAS DE ROADMAP =====

app.get('/roadmap', authenticateToken, async (req, res) => {
    try {
        const roadmap = await dbAll('SELECT * FROM roadmap ORDER BY previsao, prioridade');
        res.json(roadmap);
    } catch (error) {
        console.error('Erro ao listar roadmap:', error);
        res.status(500).json({ error: 'Erro ao listar roadmap' });
    }
});

app.post('/roadmap', authenticateToken, async (req, res) => {
    try {
        const { titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita, dependencias } = req.body;
        const result = await dbRun(`
            INSERT INTO roadmap (titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita, dependencias)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita ? 1 : 0, dependencias]);
        res.json({ id: result.lastID, ...req.body });
    } catch (error) {
        console.error('Erro ao criar item roadmap:', error);
        res.status(500).json({ error: 'Erro ao criar item roadmap' });
    }
});

app.put('/roadmap/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita, dependencias } = req.body;
        await dbRun(`
            UPDATE roadmap
            SET titulo = ?, produtoId = ?, produtoNome = ?, descricao = ?, status = ?, prioridade = ?, previsao = ?, dependeReceita = ?, dependencias = ?
            WHERE id = ?
        `, [titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita ? 1 : 0, dependencias, id]);
        res.json({ message: 'Item roadmap atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar item roadmap:', error);
        res.status(500).json({ error: 'Erro ao atualizar item roadmap' });
    }
});

app.delete('/roadmap/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await dbRun('DELETE FROM roadmap WHERE id = ?', [id]);
        res.json({ message: 'Item roadmap excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar item roadmap:', error);
        res.status(500).json({ error: 'Erro ao deletar item roadmap' });
    }
});

// ===== ROTAS DE AGENDAS =====

app.get('/agendas', authenticateToken, async (req, res) => {
    try {
        const agendas = await dbAll('SELECT * FROM agendas ORDER BY data DESC, hora DESC');
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

app.post('/agendas', authenticateToken, async (req, res) => {
    try {
        const {
            consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
            participantes, roadmapItems, ata, postLinkedin, postLinkedinMotivo, postInterno, postInternoMotivo
        } = req.body;

        const result = await dbRun(`
            INSERT INTO agendas (
                consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
                participantes, roadmapItems, ata, postLinkedin, postLinkedinMotivo, postInterno, postInternoMotivo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
            JSON.stringify(participantes || []),
            JSON.stringify(roadmapItems || []),
            ata || '',
            postLinkedin ? 1 : 0,
            postLinkedinMotivo || '',
            postInterno ? 1 : 0,
            postInternoMotivo || ''
        ]);

        await recalcularAgendasConsultor(consultorId);
        res.json({ id: result.lastID, ...req.body });
    } catch (error) {
        console.error('Erro ao criar agenda:', error);
        res.status(500).json({ error: 'Erro ao criar agenda' });
    }
});

app.put('/agendas/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
            participantes, roadmapItems, ata, postLinkedin, postLinkedinMotivo, postInterno, postInternoMotivo
        } = req.body;

        await dbRun(`
            UPDATE agendas SET
                consultorId = ?, consultorNome = ?, cliente = ?, data = ?, hora = ?, tema = ?, status = ?, duracao = ?, observacoes = ?,
                participantes = ?, roadmapItems = ?, ata = ?, postLinkedin = ?, postLinkedinMotivo = ?, postInterno = ?, postInternoMotivo = ?
            WHERE id = ?
        `, [
            consultorId, consultorNome, cliente, data, hora, tema, status, duracao, observacoes,
            JSON.stringify(participantes || []),
            JSON.stringify(roadmapItems || []),
            ata || '',
            postLinkedin ? 1 : 0,
            postLinkedinMotivo || '',
            postInterno ? 1 : 0,
            postInternoMotivo || '',
            id
        ]);

        await recalcularAgendasConsultor(consultorId);
        res.json({ message: 'Agenda atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar agenda:', error);
        res.status(500).json({ error: 'Erro ao atualizar agenda' });
    }
});

app.delete('/agendas/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const agenda = await dbGet('SELECT consultorId FROM agendas WHERE id = ?', [id]);
        await dbRun('DELETE FROM agendas WHERE id = ?', [id]);
        if (agenda) {
            await recalcularAgendasConsultor(agenda.consultorId);
        }
        res.json({ message: 'Agenda excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar agenda:', error);
        res.status(500).json({ error: 'Erro ao deletar agenda' });
    }
});

async function recalcularAgendasConsultor(consultorId) {
    const hoje = new Date();
    const mesAtual = (hoje.getMonth() + 1).toString().padStart(2, '0');
    const anoAtual = hoje.getFullYear().toString();

    const count = await dbGet(`
        SELECT COUNT(*) as total
        FROM agendas
        WHERE consultorId = ?
        AND strftime('%m', data) = ?
        AND strftime('%Y', data) = ?
        AND (status = 'Agendada' OR status = 'Realizada')
    `, [consultorId, mesAtual, anoAtual]);

    await dbRun('UPDATE consultores SET agendasUsadas = ? WHERE id = ?', [count.total, consultorId]);
}

// ===== ESTATÍSTICAS =====

app.get('/stats', authenticateToken, async (req, res) => {
    try {
        const hoje = new Date().toISOString().split('T')[0];
        const mesAtual = (new Date().getMonth() + 1).toString().padStart(2, '0');
        const anoAtual = new Date().getFullYear().toString();

        const agendasHoje = await dbGet('SELECT COUNT(*) as total FROM agendas WHERE data = ? AND status = "Agendada"', [hoje]);
        const agendasMes = await dbGet(`
            SELECT COUNT(*) as total FROM agendas
            WHERE strftime('%m', data) = ? AND strftime('%Y', data) = ?
            AND (status = 'Agendada' OR status = 'Realizada')
        `, [mesAtual, anoAtual]);
        const consultoresAtivos = await dbGet('SELECT COUNT(*) as total FROM consultores WHERE status = "Ativo"');
        const capacidade = await dbGet(`
            SELECT SUM(agendasDisponiveis) as total, SUM(agendasUsadas) as usadas
            FROM consultores WHERE status = "Ativo"
        `);

        res.json({
            agendasHoje: agendasHoje?.total || 0,
            agendasMes: agendasMes?.total || 0,
            consultoresAtivos: consultoresAtivos?.total || 0,
            capacidadeTotal: capacidade?.total || 0,
            capacidadeUsada: capacidade?.usadas || 0,
            capacidadeRestante: (capacidade?.total || 0) - (capacidade?.usadas || 0)
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
});

module.exports.handler = serverless(app);
