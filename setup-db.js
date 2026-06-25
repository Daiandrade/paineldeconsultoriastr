// ===== SETUP-DB.JS - Configuração Inicial do Banco de Dados =====
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

console.log('🔧 Configurando banco de dados...\n');

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('❌ Erro ao criar banco:', err);
        process.exit(1);
    }
    console.log('✅ Banco de dados criado\n');
    criarTabelas();
});

function criarTabelas() {
    console.log('📋 Criando tabelas...');

    db.serialize(() => {
        // Tabela de Usuários
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name TEXT NOT NULL,
                perfil TEXT DEFAULT 'user'
            )
        `);

        // Tabela de Consultores
        db.run(`
            CREATE TABLE IF NOT EXISTS consultores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL,
                telefone TEXT,
                especialidade TEXT,
                agendasDisponiveis INTEGER DEFAULT 20,
                agendasUsadas INTEGER DEFAULT 0,
                maxParticipantes INTEGER DEFAULT 10,
                status TEXT DEFAULT 'Ativo'
            )
        `);

        // Tabela de Produtos
        db.run(`
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                descricao TEXT,
                categoria TEXT,
                cor TEXT DEFAULT '#FF8000'
            )
        `);

        // Tabela de Temas
        db.run(`
            CREATE TABLE IF NOT EXISTS temas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                descricao TEXT,
                cor TEXT DEFAULT '#FF8000'
            )
        `);

        // Tabela de Roadmap
        db.run(`
            CREATE TABLE IF NOT EXISTS roadmap (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                produtoId INTEGER NOT NULL,
                produtoNome TEXT NOT NULL,
                descricao TEXT,
                status TEXT DEFAULT 'Planejado',
                prioridade TEXT DEFAULT 'Média',
                previsao TEXT,
                dependeReceita INTEGER DEFAULT 0,
                dependencias TEXT
            )
        `);

        // Tabela de Agendas
        db.run(`
            CREATE TABLE IF NOT EXISTS agendas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                consultorId INTEGER NOT NULL,
                consultorNome TEXT NOT NULL,
                cliente TEXT NOT NULL,
                data TEXT NOT NULL,
                hora TEXT NOT NULL,
                tema TEXT NOT NULL,
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
        `, (err) => {
            if (err) {
                console.error('❌ Erro ao criar tabelas:', err);
                return;
            }
            console.log('✅ Tabelas criadas\n');
            inserirDados();
        });
    });
}

function inserirDados() {
    console.log('📦 Inserindo dados iniciais...\n');

    // Verificar se já existem usuários
    db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (err) {
            console.error('❌ Erro:', err);
            return;
        }

        if (row.count === 0) {
            console.log('👤 Criando usuários padrão...');

            const hashedAdminPassword = bcrypt.hashSync('admin123', 10);
            const hashedJorgePassword = bcrypt.hashSync('jorge123', 10);

            db.run('INSERT INTO users (username, password, name, perfil) VALUES (?, ?, ?, ?)',
                ['admin', hashedAdminPassword, 'Administrador', 'admin']);

            db.run('INSERT INTO users (username, password, name, perfil) VALUES (?, ?, ?, ?)',
                ['jorge', hashedJorgePassword, 'Jorge Campos', 'user']);

            console.log('   ✅ Usuário: admin / Senha: admin123 (perfil: admin)');
            console.log('   ✅ Usuário: jorge / Senha: jorge123 (perfil: user)');
        } else {
            console.log('⏭️  Usuários já existem, pulando...');
        }

        inserirConsultores();
    });
}

function inserirConsultores() {
    db.get('SELECT COUNT(*) as count FROM consultores', (err, row) => {
        if (err) {
            console.error('❌ Erro:', err);
            return;
        }

        if (row.count === 0) {
            console.log('\n👥 Criando consultores padrão...');

            db.run(`INSERT INTO consultores (nome, email, telefone, especialidade, agendasDisponiveis, agendasUsadas, maxParticipantes, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                ['Jorge Campos', 'jorge.campos@tr.com', '(11) 98765-4321', 'SPED Fiscal', 20, 0, 15, 'Ativo']);

            db.run(`INSERT INTO consultores (nome, email, telefone, especialidade, agendasDisponiveis, agendasUsadas, maxParticipantes, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                ['Maria Silva', 'maria.silva@tr.com', '(11) 98765-1234', 'SPED Contábil', 15, 0, 10, 'Ativo']);

            db.run(`INSERT INTO consultores (nome, email, telefone, especialidade, agendasDisponiveis, agendasUsadas, maxParticipantes, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                ['Carlos Santos', 'carlos.santos@tr.com', '(11) 98765-5678', 'Reinf', 18, 0, 12, 'Ativo']);

            console.log('   ✅ 3 consultores criados');
        } else {
            console.log('⏭️  Consultores já existem, pulando...');
        }

        inserirProdutos();
    });
}

function inserirProdutos() {
    db.get('SELECT COUNT(*) as count FROM produtos', (err, row) => {
        if (err) {
            console.error('❌ Erro:', err);
            return;
        }

        if (row.count === 0) {
            console.log('\n📦 Criando produtos padrão...');

            db.run('INSERT INTO produtos (nome, descricao, categoria, cor) VALUES (?, ?, ?, ?)',
                ['SPED Fiscal Pro', 'Solução completa para SPED Fiscal', 'SPED', '#FF8000']);

            db.run('INSERT INTO produtos (nome, descricao, categoria, cor) VALUES (?, ?, ?, ?)',
                ['SPED Contábil', 'Escrituração Contábil Digital', 'SPED', '#003D5C']);

            db.run('INSERT INTO produtos (nome, descricao, categoria, cor) VALUES (?, ?, ?, ?)',
                ['Reinf Manager', 'Gestão de Retenções Federais', 'Fiscal', '#10B981']);

            console.log('   ✅ 3 produtos criados');
        } else {
            console.log('⏭️  Produtos já existem, pulando...');
        }

        inserirTemas();
    });
}

function inserirTemas() {
    db.get('SELECT COUNT(*) as count FROM temas', (err, row) => {
        if (err) {
            console.error('❌ Erro:', err);
            return;
        }

        if (row.count === 0) {
            console.log('\n📚 Criando temas padrão...');

            const temas = [
                ['SPED Fiscal', 'Consultoria sobre obrigações fiscais', '#FF8000'],
                ['SPED Contábil', 'Consultoria sobre escrituração contábil', '#003D5C'],
                ['Reinf', 'Consultoria sobre retenções federais', '#10B981'],
                ['eSocial', 'Consultoria sobre eSocial', '#3B82F6'],
                ['EFD Contribuições', 'Consultoria sobre EFD Contribuições', '#8B5CF6']
            ];

            temas.forEach(([nome, descricao, cor]) => {
                db.run('INSERT INTO temas (nome, descricao, cor) VALUES (?, ?, ?)', [nome, descricao, cor]);
            });

            console.log('   ✅ 5 temas criados');
        } else {
            console.log('⏭️  Temas já existem, pulando...');
        }

        inserirRoadmap();
    });
}

function inserirRoadmap() {
    db.get('SELECT COUNT(*) as count FROM roadmap', (err, row) => {
        if (err) {
            console.error('❌ Erro:', err);
            return;
        }

        if (row.count === 0) {
            console.log('\n🗺️  Criando itens de roadmap padrão...');

            const roadmapItems = [
                ['Validação automática de XML', 1, 'SPED Fiscal Pro', 'Implementar validação automática', 'Em Desenvolvimento', 'Alta', '2026-08-15', 1, 'Aguardando Receita Federal'],
                ['Dashboard Analytics Fiscal', 1, 'SPED Fiscal Pro', 'Criar dashboard com gráficos', 'Planejado', 'Média', '2026-09-30', 0, ''],
                ['Importação em lote', 2, 'SPED Contábil', 'Importação múltipla', 'Planejado', 'Baixa', '2026-10-15', 0, ''],
                ['Integração folha', 3, 'Reinf Manager', 'Integração sistemas folha', 'Em Desenvolvimento', 'Crítica', '2026-07-30', 0, 'Aprovação arquitetura'],
                ['Relatório inconsistências', 3, 'Reinf Manager', 'Relatório detalhado', 'Planejado', 'Alta', '2026-08-20', 1, 'Layout Receita Federal']
            ];

            roadmapItems.forEach(([titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita, dependencias]) => {
                db.run(`
                    INSERT INTO roadmap (titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita, dependencias)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [titulo, produtoId, produtoNome, descricao, status, prioridade, previsao, dependeReceita, dependencias]);
            });

            console.log('   ✅ 5 itens de roadmap criados');
        } else {
            console.log('⏭️  Itens de roadmap já existem, pulando...');
        }

        finalizarSetup();
    });
}

function finalizarSetup() {
    console.log('\n✅ Banco de dados configurado com sucesso!\n');
    console.log('🚀 Execute "npm start" para iniciar o servidor\n');

    db.close((err) => {
        if (err) {
            console.error('❌ Erro ao fechar banco:', err);
        }
        process.exit(0);
    });
}
