// Script para inicializar banco Turso em produção
require('dotenv').config();
const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');

async function init() {
    console.log('🚀 Iniciando script de setup do Turso...');
    console.log('📊 Conectando ao banco...');

    const db = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    try {
        // Criar tabela users
        console.log('📋 Criando tabela users...');
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name TEXT NOT NULL,
                perfil TEXT DEFAULT 'user'
            )
        `);

        // Verificar se admin existe
        const result = await db.execute({
            sql: 'SELECT id FROM users WHERE username = ?',
            args: ['admin']
        });

        if (result.rows.length === 0) {
            console.log('👤 Criando usuário admin...');
            const hashedPassword = bcrypt.hashSync('admin123', 10);
            await db.execute({
                sql: 'INSERT INTO users (username, password, name, perfil) VALUES (?, ?, ?, ?)',
                args: ['admin', hashedPassword, 'Administrador', 'admin']
            });
            console.log('✅ Usuário admin criado!');
        } else {
            console.log('ℹ️  Usuário admin já existe');
        }

        // Criar outras tabelas
        console.log('📋 Criando tabelas...');

        await db.execute(`
            CREATE TABLE IF NOT EXISTS consultores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT,
                telefone TEXT,
                especialidade TEXT,
                agendasDisponiveis INTEGER DEFAULT 20,
                agendasUsadas INTEGER DEFAULT 0,
                maxParticipantes INTEGER DEFAULT 10,
                status TEXT DEFAULT 'Ativo'
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                descricao TEXT,
                categoria TEXT,
                cor TEXT DEFAULT '#FF8000'
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS temas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                descricao TEXT,
                cor TEXT DEFAULT '#FF8000'
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS roadmap (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                produtoId INTEGER,
                produtoNome TEXT,
                descricao TEXT,
                status TEXT DEFAULT 'Planejado',
                prioridade TEXT DEFAULT 'Média',
                previsao TEXT,
                dependeReceita INTEGER DEFAULT 0,
                dependencias TEXT,
                agendaId INTEGER
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS agendas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                consultorId INTEGER,
                consultorNome TEXT,
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
            )
        `);

        console.log('✅ Todas as tabelas criadas!');
        console.log('');
        console.log('🎉 Setup concluído com sucesso!');
        console.log('');
        console.log('📝 Credenciais:');
        console.log('   Usuário: admin');
        console.log('   Senha: admin123');

    } catch (error) {
        console.error('❌ Erro durante o setup:', error);
        process.exit(1);
    }
}

init();
