# 🚀 Guia de Deploy - Painel de Consultorias TR com Backend

## 📋 Mudanças da Versão 2.3.0

✅ **Backend Node.js + Express** implementado
✅ **Banco de dados SQLite** para persistência real
✅ **Autenticação JWT** para segurança
✅ **API RESTful** completa
✅ **Senhas criptografadas** com bcrypt
✅ **Pronto para produção**

---

## 🏗️ Arquitetura

```
Frontend (HTML/CSS/JS) → Backend (Node.js/Express) → Database (SQLite)
                              ↓
                         API RESTful
                         JWT Authentication
```

---

## 🔧 Pré-requisitos

Antes de colocar em produção:

- ✅ Node.js 16+ instalado
- ✅ npm ou yarn
- ✅ Servidor com suporte a Node.js (VPS, Cloud, etc.)

---

## 📦 Instalação Local (Teste)

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env e alterar JWT_SECRET
```

**⚠️ IMPORTANTE**: Gere uma chave JWT forte:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Cole o resultado no `.env`:

```env
JWT_SECRET=sua-chave-gerada-aqui
PORT=3000
NODE_ENV=production
```

### 3. Configurar banco de dados

```bash
npm run setup
```

Isso irá:
- Criar o arquivo `database.db`
- Criar todas as tabelas
- Inserir dados iniciais (usuários, consultores, produtos, etc.)

**Credenciais padrão criadas:**
- Admin: `admin` / `admin123`
- Usuário: `jorge` / `jorge123`

### 4. Iniciar servidor

```bash
# Produção
npm start

# Desenvolvimento (com auto-reload)
npm run dev
```

Acesse: `http://localhost:3000`

---

## 🌐 Deploy em Produção

### **Opção 1: Heroku** (Recomendado - GRATUITO até certo ponto)

#### **Vantagens:**
- ✅ HTTPS automático
- ✅ Deploy via Git
- ✅ Logs integrados
- ✅ Fácil escalabilidade

#### **Passos:**

1. **Instalar Heroku CLI**
   - Windows: https://devcenter.heroku.com/articles/heroku-cli
   - Linux/Mac: `curl https://cli-assets.heroku.com/install.sh | sh`

2. **Login no Heroku**
```bash
heroku login
```

3. **Criar aplicação**
```bash
heroku create painel-consultorias-tr
```

4. **Configurar variáveis de ambiente**
```bash
# Gerar chave JWT forte
JWT_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Configurar no Heroku
heroku config:set JWT_SECRET=$JWT_KEY
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git add .
git commit -m "Deploy para produção com backend"
git push heroku main
```

6. **Configurar banco de dados**
```bash
heroku run npm run setup
```

7. **Abrir aplicação**
```bash
heroku open
```

**URL gerada**: `https://painel-consultorias-tr.herokuapp.com`

---

### **Opção 2: Render** (Recomendado - GRATUITO)

#### **Vantagens:**
- ✅ 100% Gratuito para projetos pequenos
- ✅ HTTPS automático
- ✅ Deploy automático via Git
- ✅ Zero configuração

#### **Passos:**

1. **Criar conta** em https://render.com

2. **Novo Web Service**
   - Click "New +" → "Web Service"
   - Conectar repositório GitHub
   - Selecionar repositório do projeto

3. **Configurar**
   - **Name**: `painel-consultorias-tr`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run setup`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. **Variáveis de Ambiente**
   - Click "Environment"
   - Adicionar:
     - `JWT_SECRET`: (gerar chave forte)
     - `NODE_ENV`: `production`

5. **Deploy**
   - Click "Create Web Service"
   - Deploy automático!

**URL gerada**: `https://painel-consultorias-tr.onrender.com`

---

### **Opção 3: Railway** (Moderno - GRATUITO)

#### **Vantagens:**
- ✅ Deploy super rápido
- ✅ HTTPS automático
- ✅ PostgreSQL gratuito (se quiser migrar de SQLite)

#### **Passos:**

1. **Criar conta** em https://railway.app

2. **New Project** → "Deploy from GitHub repo"

3. **Selecionar repositório**

4. **Configurar variáveis**
   - Settings → Variables
   - Adicionar `JWT_SECRET` e `NODE_ENV`

5. **Deploy automático!**

**URL gerada**: `https://painel-consultorias-tr.up.railway.app`

---

### **Opção 4: VPS/Servidor Próprio** (Avançado)

#### **Para Ubuntu/Debian:**

1. **Instalar Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Copiar projeto para servidor**
```bash
scp -r * usuario@servidor:/var/www/painel-consultorias/
```

3. **Instalar dependências**
```bash
cd /var/www/painel-consultorias
npm install --production
```

4. **Configurar .env**
```bash
nano .env
# Adicionar JWT_SECRET forte
```

5. **Configurar banco de dados**
```bash
npm run setup
```

6. **Instalar PM2 (gerenciador de processos)**
```bash
sudo npm install -g pm2
pm2 start server.js --name "painel-consultorias"
pm2 startup
pm2 save
```

7. **Configurar Nginx como proxy reverso**
```nginx
# /etc/nginx/sites-available/painel-consultorias
server {
    listen 80;
    server_name painel.suaempresa.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

8. **Ativar site**
```bash
sudo ln -s /etc/nginx/sites-available/painel-consultorias /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

9. **Configurar HTTPS com Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d painel.suaempresa.com.br
```

---

## 🔒 Segurança em Produção

### **1. Alterar Credenciais Padrão**

⚠️ **CRÍTICO**: Após primeiro login, altere as senhas padrão:

1. Login como `admin` / `admin123`
2. Ir em "Usuários"
3. Editar cada usuário e trocar senha
4. Usar senhas fortes (min 12 caracteres)

### **2. Variáveis de Ambiente**

✅ **NUNCA** commitar o arquivo `.env`
✅ Usar variáveis de ambiente do servidor
✅ Gerar JWT_SECRET único e forte

### **3. HTTPS Obrigatório**

- Heroku/Render/Railway: automático ✓
- VPS: usar Let's Encrypt (gratuito)

### **4. Backup do Banco de Dados**

**Backup manual:**
```bash
cp database.db database_backup_$(date +%Y%m%d).db
```

**Backup automático (cron):**
```bash
# Adicionar ao crontab
0 2 * * * cd /var/www/painel-consultorias && cp database.db backups/database_$(date +\%Y\%m\%d).db
```

**Download do backup:**
```bash
# Do servidor
scp usuario@servidor:/var/www/painel-consultorias/database.db ./backup_local.db
```

### **5. Rate Limiting (Opcional)**

Adicione ao `server.js`:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite de 100 requests
});

app.use('/api/', limiter);
```

---

## 🔄 Atualização em Produção

### **Heroku/Render/Railway (via Git):**

```bash
# Fazer alterações
git add .
git commit -m "Atualização X"
git push origin main

# Deploy automático!
```

### **VPS/Servidor Próprio:**

```bash
# No servidor
cd /var/www/painel-consultorias
git pull origin main
npm install
pm2 restart painel-consultorias
```

---

## 📊 Monitoramento

### **Logs do Servidor:**

**Heroku:**
```bash
heroku logs --tail
```

**Render:**
- Dashboard → Logs (em tempo real)

**VPS (PM2):**
```bash
pm2 logs painel-consultorias
pm2 monit
```

### **Saúde do Banco:**

```bash
# Verificar tamanho
ls -lh database.db

# Vacuum (otimizar)
sqlite3 database.db "VACUUM;"
```

---

## 🧪 Testando a API

### **Usando cURL:**

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Copiar o token retornado

# Listar agendas
curl -X GET http://localhost:3000/api/agendas \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### **Usando Postman:**

1. Importar coleção (criar manualmente ou usar Thunder Client no VSCode)
2. Configurar Authorization: Bearer Token
3. Testar endpoints:
   - POST `/api/auth/login`
   - GET `/api/agendas`
   - POST `/api/agendas`
   - PUT `/api/agendas/:id`
   - DELETE `/api/agendas/:id`

---

## 🆘 Troubleshooting

### **Erro: "Cannot find module"**
```bash
npm install
```

### **Erro: "EADDRINUSE" (porta em uso)**
```bash
# Mudar porta no .env
PORT=3001
```

### **Erro: "JWT malformed"**
- Verificar se JWT_SECRET está configurado
- Fazer novo login para gerar token válido

### **Banco de dados corrompido**
```bash
# Restaurar backup
cp database_backup.db database.db

# Ou recriar
rm database.db
npm run setup
```

### **Frontend não conecta com backend**
- Verificar se API_URL está correto (próximo passo)
- Verificar CORS no servidor
- Verificar console do navegador (F12)

---

## 🎯 Próximos Passos

Agora vamos integrar o frontend com o backend:

1. ✅ Backend criado e testado
2. ⏳ **Adaptar `app.js` para usar a API** (próximo)
3. ⏳ Testar integração completa
4. ⏳ Deploy final

---

## 📞 URLs de Exemplo

**Heroku:**
```
https://painel-consultorias-tr.herokuapp.com
```

**Render:**
```
https://painel-consultorias-tr.onrender.com
```

**Railway:**
```
https://painel-consultorias-tr.up.railway.app
```

**VPS:**
```
https://painel.suaempresa.com.br
```

---

**Versão**: 2.3.0 (Backend)
**Status**: ✅ Backend Pronto - Frontend precisa adaptação
**Autor**: Thomson Reuters - Equipe SPED
