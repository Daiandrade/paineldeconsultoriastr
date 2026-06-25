# 🚀 Painel de Consultorias TR - Thomson Reuters

![Status](https://img.shields.io/badge/status-production-brightgreen)
![Version](https://img.shields.io/badge/version-2.3.0-blue)
![Backend](https://img.shields.io/badge/backend-Node.js-success)
![Database](https://img.shields.io/badge/database-SQLite-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Sistema completo de gerenciamento de agendas de consultorias e roadmap de produtos TR com **backend Node.js** e banco de dados real.

---

## ✨ Principais Funcionalidades

### 📅 **Gestão de Agendas**
- Modal com 5 abas organizadas
- Controle de participantes com limite por consultor
- **Kanban visual** por produto para seleção de roadmap
- **Timeline interativa** com ordenação inteligente
- Ata de reunião (até 10.000 caracteres)
- Controle de posts (LinkedIn + Interno) com justificativas

### 👥 **Consultores**
- Limite personalizado de participantes
- Controle de agendas disponíveis/mês
- Contagem automática apenas do **mês atual**
- Barra de progresso visual (verde/amarelo/vermelho)
- Recálculo automático e preciso

### 📦 **Produtos TR**
- Cadastro com cores personalizadas
- Vínculo com itens de roadmap
- Visualização por categorias

### 🗺️ **Roadmap de Produtos**
- **2 visualizações:** Lista e Timeline
- Status: Planejado, Em Desenvolvimento, Concluído
- Prioridades: Baixa, Média, Alta, Crítica
- **Flag especial:** Depende da Receita Federal
- Campo de outras dependências
- Previsão de entrega
- Vincular a agendas específicas

### 📊 **Dashboard**
- Estatísticas em tempo real
- Agendas de hoje
- Agendas do mês atual
- Capacidade restante do time

---

## 🎨 Design

- **Cores Thomson Reuters:** Laranja #FF8000 e Azul #003D5C
- Layout responsivo (desktop, tablet, mobile)
- Tabelas zebradas
- Animações suaves
- Kanban tipo Trello
- Timeline vertical profissional

---

## 🚀 Como Usar

### **Instalação Rápida (3 minutos):**

```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
cp .env.example .env
# Editar .env e adicionar JWT_SECRET forte

# 3. Configurar banco de dados
npm run setup

# 4. Iniciar servidor
npm start

# 5. Acessar http://localhost:3000
# Login: admin / admin123
```

📖 **Guia completo:** [INSTALL.md](INSTALL.md)

### **Deploy em Produção:**

Consulte o arquivo **`DEPLOY-BACKEND.md`** para instruções de deploy em:
- **Heroku** (gratuito até certo ponto)
- **Render** (100% gratuito)
- **Railway** (gratuito)
- **VPS/Servidor próprio**

---

## 📁 Estrutura de Arquivos

```
painel-consultorias-tr/
├── Backend
│   ├── server.js                # Servidor Express + API REST
│   ├── setup-db.js              # Configuração do banco
│   ├── package.json             # Dependências Node.js
│   ├── .env.example             # Exemplo de configuração
│   └── database.db              # Banco SQLite (gerado)
├── Frontend
│   ├── index.html               # Página principal
│   ├── styles.css               # Estilos completos
│   ├── app.js                   # Lógica + integração API
│   └── reset.html               # Utilitário de reset
├── Documentação
│   ├── README.md                # Este arquivo
│   ├── INSTALL.md               # Instalação rápida
│   ├── DEPLOY-BACKEND.md        # Deploy com backend
│   ├── DEPLOY.md                # Deploy frontend only
│   ├── FEATURES.md              # Funcionalidades
│   ├── TIMELINE-GUIDE.md        # Guia da timeline
│   └── CONTAGEM-AGENDAS.md      # Lógica de contagem
└── .gitignore                   # Arquivos ignorados
```

---

## 🔐 Segurança

- ✅ **Autenticação JWT** com tokens seguros
- ✅ **Senhas criptografadas** com bcrypt
- ✅ **Banco de dados real** (SQLite)
- ✅ **API RESTful** com middleware de autenticação
- ⚠️ **IMPORTANTE:** Alterar senhas padrão no primeiro acesso
- 🔒 **HTTPS obrigatório** em produção
- 💾 **Backups automáticos** recomendados

---

## 🛠️ Tecnologias

### **Backend:**
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite** (better-sqlite3) - Banco de dados
- **JWT** (jsonwebtoken) - Autenticação
- **bcryptjs** - Criptografia de senhas
- **dotenv** - Variáveis de ambiente

### **Frontend:**
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada
  - Flexbox & Grid
  - Animações e transições
  - Variáveis CSS
  - Media queries
- **JavaScript ES6+** - Lógica + integração API
  - Fetch API
  - LocalStorage (para token)
  - Date API
  - Manipulação DOM

---

## 📊 Dados de Exemplo

O sistema vem com dados de exemplo:

**Usuários:**
- `admin` / `admin123`
- `jorge` / `jorge123`

**3 Consultores**
- Jorge Campos (SPED Fiscal)
- Maria Silva (SPED Contábil)
- Carlos Santos (Reinf)

**3 Produtos**
- SPED Fiscal Pro
- SPED Contábil
- Reinf Manager

**7 Itens de Roadmap**
- Com datas variadas
- Diferentes prioridades
- Alguns dependem da Receita

**3 Agendas**
- Com participantes
- Com status diferentes
- Com dados completos

---

## 🔄 Atualização

O sistema **recalcula automaticamente** todas as contagens:
- Ao carregar o dashboard
- Ao criar/editar/excluir agenda
- Ao trocar consultor
- Considera apenas **mês atual**

---

## 📱 Responsividade

Testado e otimizado para:
- ✅ Desktop (1920x1080)
- ✅ Laptop (1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

---

## 🆘 Suporte

### **Resetar Dados:**
1. Abrir `reset.html`
2. Clicar em "Limpar e Resetar"
3. Sistema reinicia com dados padrão

### **Backup Manual:**
```javascript
// Console do navegador (F12)
const backup = {
    users: localStorage.getItem('users'),
    consultores: localStorage.getItem('consultores'),
    produtos: localStorage.getItem('produtos'),
    roadmap: localStorage.getItem('roadmap'),
    temas: localStorage.getItem('temas'),
    agendas: localStorage.getItem('agendas')
};
console.log(JSON.stringify(backup));
```

---

## 🎯 Roadmap Futuro

Já implementado:
- [x] Backend com API REST ✅
- [x] Banco de dados SQLite ✅
- [x] Sistema de autenticação JWT ✅
- [x] Criptografia de senhas ✅

Possíveis melhorias:
- [ ] Migrar para PostgreSQL/MySQL
- [ ] Notificações de agendas próximas
- [ ] Exportar para Excel/PDF
- [ ] Integração com calendário (Google/Outlook)
- [ ] Gráficos avançados com Chart.js
- [ ] Histórico de alterações (audit log)
- [ ] Multi-tenant
- [ ] API de webhook
- [ ] Integração com Slack/Teams

---

## 📄 Licença

MIT License - Livre para uso e modificação

---

## 👨‍💻 Desenvolvimento

**Versão Atual:** 2.3.0 - Production Backend Edition  
**Data:** Junho 2026  
**Status:** ✅ Produção com Backend

### **Histórico de Versões:**

- **2.3.0** - Backend Node.js + SQLite + JWT + API REST ✨
- **2.2.0** - Lógica de contagem por mês atual
- **2.1.0** - Timeline visual robusta
- **2.0.0** - Kanban de roadmap
- **1.0.0** - Versão inicial

---

## 🌟 Destaques

### **Kanban de Roadmap:**
- Colunas por produto
- Seleção visual (clique)
- Animação de pulsação
- Contador em tempo real

### **Timeline:**
- Linha vertical conectando itens
- Ordenação por data + prioridade
- Agrupamento por status
- Cards interativos

### **Contagem Inteligente:**
- Apenas mês atual
- Recálculo automático
- Barra de progresso colorida
- Impossível descalibrar

---

## 📞 Contato

Para dúvidas ou suporte:
- Documentação completa incluída
- Consulte os arquivos `.md` na raiz

---

**Desenvolvido para Thomson Reuters - SPED Brasil**

*Sistema de Gerenciamento de Agendas e Consultorias*