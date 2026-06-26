# 🚀 Deploy no Netlify - Painel de Consultorias TR

## 📋 Pré-requisitos

1. Conta no [Netlify](https://netlify.com) (gratuita)
2. Código no GitHub/GitLab (ou deploy manual via CLI)

## 🔧 Método 1: Deploy via GitHub (Recomendado)

### Passo 1: Criar repositório no GitHub

```bash
git init
git add .
git commit -m "Preparado para Netlify"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/painel-consultorias-tr.git
git push -u origin main
```

### Passo 2: Conectar ao Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em **"Add new site" → "Import an existing project"**
3. Escolha **GitHub** e autorize o acesso
4. Selecione o repositório `painel-consultorias-tr`
5. Configure:
   - **Build command:** `npm install`
   - **Publish directory:** `.`
   - **Functions directory:** `netlify/functions`
6. Clique em **"Deploy"**

### Passo 3: Configurar variáveis de ambiente

1. No dashboard do Netlify, vá em **Site settings → Environment variables**
2. Adicione:
   - **JWT_SECRET**: `seu-secret-aqui-mude-isso` (crie um secret forte!)

### Passo 4: Acessar o site

Seu site estará disponível em: `https://seu-site.netlify.app`

---

## 🔧 Método 2: Deploy via Netlify CLI

### Passo 1: Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

### Passo 2: Login no Netlify

```bash
netlify login
```

### Passo 3: Inicializar e fazer deploy

```bash
netlify init
# Siga as instruções no terminal

# Deploy manual
netlify deploy --prod
```

---

## ⚙️ Configurações Importantes

### Variáveis de Ambiente (.env local)

Crie um arquivo `.env` localmente (não commitar!):

```env
JWT_SECRET=seu-secret-super-seguro-aqui-mude-isso
PORT=3000
```

### Banco de Dados

⚠️ **IMPORTANTE**: O Netlify Functions usa `/tmp` para o banco SQLite, que é **efêmero** (reseta a cada deploy).

**Opções para persistência:**
1. **Netlify Blobs** (recomendado) - adicionar em versão futura
2. **Supabase** (PostgreSQL gratuito)
3. **PlanetScale** (MySQL serverless)
4. **Railway** (PostgreSQL com plano gratuito)

Para produção real, recomendo migrar para um banco de dados externo.

---

## 🧪 Testar Localmente

```bash
# Instalar dependências
npm install

# Testar localmente com Netlify Dev
netlify dev
```

Acesse: `http://localhost:8888`

---

## 📝 Estrutura de Arquivos

```
painel-consultorias-tr/
├── netlify/
│   └── functions/
│       └── server.js          # Serverless function
├── netlify.toml               # Configuração do Netlify
├── index.html                 # Frontend
├── server.js                  # Server local (dev)
├── package.json
└── .gitignore
```

---

## 🔐 Credenciais Padrão

- **Usuário:** admin
- **Senha:** admin123

⚠️ **MUDE ISSO IMEDIATAMENTE EM PRODUÇÃO!**

---

## 🐛 Troubleshooting

### Erro: "Function timeout"
- Netlify Functions tem timeout de 10s no plano gratuito
- Otimize queries do banco de dados

### Erro: "Module not found"
- Verifique se `serverless-http` está no `package.json`
- Execute `npm install`

### Banco de dados vazio após deploy
- Normal! O banco é recriado a cada deploy
- Considere usar um banco externo persistente

---

## 📚 Recursos

- [Documentação Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Supabase (alternativa de DB)](https://supabase.com)

---

## ✅ Checklist de Deploy

- [ ] Código no GitHub
- [ ] Site criado no Netlify
- [ ] Variável `JWT_SECRET` configurada
- [ ] Deploy realizado com sucesso
- [ ] Login testado (admin/admin123)
- [ ] Senha do admin alterada
- [ ] Banco de dados externo configurado (opcional)
