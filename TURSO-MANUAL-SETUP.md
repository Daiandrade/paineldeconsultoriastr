# 🚀 Setup Manual do Turso (Via Interface Web)

## ⚠️ Problema com CLI

Como houve problemas para instalar o Turso CLI, vamos fazer o setup via interface web mesmo.

---

## 📋 Passo 1: Criar conta no Turso

1. Acesse: [https://turso.tech](https://turso.tech)
2. Clique em **"Sign Up"**
3. Faça login com **GitHub**

---

## 📋 Passo 2: Criar o Database via Dashboard

### 2.1 Acessar o Dashboard
1. Após login, você será redirecionado para o dashboard
2. URL: [https://turso.tech/app](https://turso.tech/app)

### 2.2 Criar novo Database
1. Clique em **"Create Database"** ou **"New Database"**
2. Preencha:
   - **Name:** `painel-consultorias-tr`
   - **Region:** Escolha a mais próxima (ex: São Paulo ou Virginia)
3. Clique em **"Create"**

### 2.3 Obter as Credenciais

Após criar o database, você verá:

**1. Database URL** (algo como):
```
libsql://painel-consultorias-tr-seunome.turso.io
```
📋 **Copie esta URL!**

**2. Auth Token:**
- Clique em **"Generate Token"** ou **"Create Token"**
- Copie o token gerado (algo como: `eyJ...`)

---

## 📋 Passo 3: Criar Arquivo .env

Crie o arquivo `.env` na raiz do projeto com:

```env
# JWT Secret (MUDE ISSO!)
JWT_SECRET=seu-secret-super-seguro-aqui-mude-isso-123

# Turso Database (Cole suas credenciais aqui)
TURSO_DATABASE_URL=libsql://painel-consultorias-tr-SEUNOME.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...

# Porta (opcional)
PORT=3000
```

⚠️ **IMPORTANTE:**
- Substitua `TURSO_DATABASE_URL` pela URL que você copiou
- Substitua `TURSO_AUTH_TOKEN` pelo token que você copiou
- Mude o `JWT_SECRET` para algo único e seguro

---

## 📋 Passo 4: Instalar Dependências

```bash
npm install
```

---

## 📋 Passo 5: Testar Localmente

```bash
node server-turso.js
```

Você deve ver:
```
✅ Conectado ao Turso
✅ Database inicializado com sucesso
🚀 Servidor rodando na porta 3000
📱 Acesse: http://localhost:3000
🗄️ Database: ☁️ Turso
```

---

## 📋 Passo 6: Testar o Login

1. Acesse: http://localhost:3000
2. Faça login com:
   - **Usuário:** admin
   - **Senha:** admin123

Se funcionou, está tudo certo! ✅

---

## 📋 Passo 7: Configurar no Netlify

### 7.1 Fazer Deploy no Netlify

```bash
git add .
git commit -m "Configurado para Turso"
git push
```

### 7.2 Adicionar Variáveis de Ambiente no Netlify

1. Acesse seu site no Netlify: [app.netlify.com](https://app.netlify.com)
2. Vá em **Site settings → Environment variables**
3. Adicione **3 variáveis**:

**Variável 1:**
- **Key:** `JWT_SECRET`
- **Value:** `seu-secret-super-seguro-aqui-mude-isso-123`

**Variável 2:**
- **Key:** `TURSO_DATABASE_URL`
- **Value:** `libsql://painel-consultorias-tr-SEUNOME.turso.io` (cole sua URL)

**Variável 3:**
- **Key:** `TURSO_AUTH_TOKEN`
- **Value:** `eyJhbGci...` (cole seu token)

4. Clique em **"Save"**
5. Faça um **redeploy** do site (Deploy → Trigger deploy)

---

## 📋 Passo 8: Atualizar netlify.toml

Abra o arquivo `netlify.toml` e verifique se está assim:

```toml
[build]
  command = "npm install"
  publish = "."
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📋 Passo 9: Renomear Função do Netlify

Como estamos usando Turso, precisamos usar a função correta:

```bash
# No PowerShell, rode:
cd netlify/functions
Copy-Item server-turso.js server.js -Force
```

Ou simplesmente:
- Delete o arquivo `netlify/functions/server.js` antigo
- Renomeie `netlify/functions/server-turso.js` para `server.js`

---

## ✅ Verificar se está funcionando

### Local:
```bash
node server-turso.js
```
Acesse http://localhost:3000 e teste o login

### Produção (Netlify):
Acesse seu site no Netlify (ex: `https://seu-site.netlify.app`)

---

## 🎯 Comandos Úteis (Via Dashboard Web)

Como não temos o CLI instalado, use o dashboard web do Turso:

### Ver dados do banco:
1. Acesse [turso.tech/app](https://turso.tech/app)
2. Clique no seu database `painel-consultorias-tr`
3. Vá em **"SQL Shell"** ou **"Query Editor"**
4. Execute queries SQL diretamente:

```sql
-- Ver usuários
SELECT * FROM users;

-- Ver consultores
SELECT * FROM consultores;

-- Ver agendas
SELECT * FROM agendas;
```

### Criar tokens adicionais:
1. No dashboard do database
2. Vá em **"Tokens"** ou **"Settings"**
3. Clique em **"Create Token"**

### Ver estatísticas:
1. Dashboard do database
2. Seção **"Metrics"** ou **"Analytics"**

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to Turso"
- Verifique se a URL está correta no `.env`
- Verifique se o token está correto
- Teste a conexão no dashboard web do Turso

### Erro: "Authentication failed"
- Gere um novo token no dashboard do Turso
- Substitua no `.env` e nas variáveis do Netlify

### Dados não aparecem
- Verifique se o servidor rodou sem erros
- Verifique no dashboard do Turso se as tabelas foram criadas
- Use o SQL Shell do dashboard para ver os dados

---

## 📚 Próximos Passos (Opcional)

### Instalar CLI depois (se quiser):

Se você quiser instalar o CLI depois para ter mais controle:

**Método 1 - Download Manual:**
1. Acesse: https://github.com/tursodatabase/turso-cli/releases/latest
2. Baixe `turso-cli-windows-amd64.zip`
3. Extraia para `C:\turso\`
4. Adicione `C:\turso` ao PATH do Windows

**Método 2 - Scoop:**
```powershell
# Instalar Scoop (se não tiver)
irm get.scoop.sh | iex

# Instalar Turso
scoop install turso
```

---

## ✅ Checklist

- [ ] Conta criada no Turso (via GitHub)
- [ ] Database criado no dashboard
- [ ] URL e Token copiados
- [ ] Arquivo `.env` criado e configurado
- [ ] `npm install` rodado
- [ ] Servidor local testado (`node server-turso.js`)
- [ ] Login funcionando (admin/admin123)
- [ ] Variáveis configuradas no Netlify
- [ ] Deploy feito no Netlify
- [ ] Site produção testado

---

## 🎉 Pronto!

Seu sistema está rodando com Turso! 🚀

**Vantagens:**
- ✅ Banco de dados persistente na nuvem
- ✅ Até 500 databases grátis
- ✅ 1 GB de storage
- ✅ Latência baixíssima
- ✅ Backups automáticos
