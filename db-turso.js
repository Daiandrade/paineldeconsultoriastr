// ===== TURSO DATABASE CONNECTION =====
const { createClient } = require('@libsql/client');

let db = null;

function getDb() {
    if (db) return db;

    // Detectar ambiente
    const isDevelopment = !process.env.TURSO_DATABASE_URL;

    if (isDevelopment) {
        // Desenvolvimento: usar SQLite local
        console.log('🔧 Modo desenvolvimento: usando SQLite local');
        const sqlite3 = require('sqlite3').verbose();
        const localDb = new sqlite3.Database('./database.db', (err) => {
            if (err) console.error('❌ Erro ao conectar ao SQLite local:', err);
            else console.log('✅ Conectado ao SQLite local');
        });

        // Wrapper para compatibilidade com Turso
        db = {
            execute: async (sql, params = []) => {
                return new Promise((resolve, reject) => {
                    localDb.all(sql, params, (err, rows) => {
                        if (err) reject(err);
                        else resolve({ rows });
                    });
                });
            }
        };
    } else {
        // Produção: usar Turso
        console.log('🚀 Modo produção: usando Turso');
        db = createClient({
            url: process.env.TURSO_DATABASE_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });
        console.log('✅ Conectado ao Turso');
    }

    return db;
}

// Helper functions para facilitar queries
async function dbGet(sql, params = []) {
    const db = getDb();
    const result = await db.execute(sql, params);
    return result.rows[0] || null;
}

async function dbAll(sql, params = []) {
    const db = getDb();
    const result = await db.execute(sql, params);
    return result.rows;
}

async function dbRun(sql, params = []) {
    const db = getDb();
    const result = await db.execute(sql, params);
    return {
        lastID: result.lastInsertRowid,
        changes: result.rowsAffected
    };
}

// Inicializar database (criar tabelas se não existirem)
async function initializeDatabase() {
    const db = getDb();

    try {
        // Tabela de usuários
        await db.execute(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            perfil TEXT DEFAULT 'user'
        )`);

        // Verificar se usuário admin existe
        const adminExists = await dbGet('SELECT id FROM users WHERE username = ?', ['admin']);

        if (!adminExists) {
            const bcrypt = require('bcryptjs');
            const hashedPassword = bcrypt.hashSync('admin123', 10);
            await dbRun(
                'INSERT INTO users (username, password, name, perfil) VALUES (?, ?, ?, ?)',
                ['admin', hashedPassword, 'Administrador', 'admin']
            );
            console.log('✅ Usuário admin criado');
        }

        // Tabela de consultores
        await db.execute(`CREATE TABLE IF NOT EXISTS consultores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT,
            telefone TEXT,
            especialidade TEXT,
            agendasDisponiveis INTEGER DEFAULT 5,
            agendasUsadas INTEGER DEFAULT 0,
            maxParticipantes INTEGER DEFAULT 10,
            status TEXT DEFAULT 'Ativo'
        )`);

        // Tabela de produtos
        await db.execute(`CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT,
            categoria TEXT,
            cor TEXT
        )`);

        // Tabela de temas
        await db.execute(`CREATE TABLE IF NOT EXISTS temas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT,
            cor TEXT
        )`);

        // Tabela de roadmap
        await db.execute(`CREATE TABLE IF NOT EXISTS roadmap (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            produtoId INTEGER,
            produtoNome TEXT,
            descricao TEXT,
            status TEXT DEFAULT 'Planejado',
            prioridade TEXT DEFAULT 'Média',
            previsao TEXT,
            dependeReceita INTEGER DEFAULT 0,
            dependencias TEXT
        )`);

        // Tabela de agendas
        await db.execute(`CREATE TABLE IF NOT EXISTS agendas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            consultorId INTEGER NOT NULL,
            consultorNome TEXT NOT NULL,
            cliente TEXT NOT NULL,
            data TEXT NOT NULL,
            hora TEXT NOT NULL,
            tema TEXT,
            status TEXT DEFAULT 'Agendada',
            duracao INTEGER DEFAULT 60,
            observacoes TEXT,
            participantes TEXT DEFAULT '[]',
            roadmapItems TEXT DEFAULT '[]',
            ata TEXT,
            postLinkedin INTEGER DEFAULT 0,
            postLinkedinMotivo TEXT,
            postInterno INTEGER DEFAULT 0,
            postInternoMotivo TEXT
        )`);

        console.log('✅ Database inicializado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao inicializar database:', error);
        throw error;
    }
}

module.exports = {
    getDb,
    dbGet,
    dbAll,
    dbRun,
    initializeDatabase
};
