# 🚀 Deploy no Render - Passo a Passo

## ✅ Vantagens do Render:
- 100% GRATUITO
- HTTPS automático
- Deploy automático via Git
- Banco SQLite funciona perfeitamente
- Interface simples

---

## 📋 PRÉ-REQUISITOS:

1. ✅ Código commitado no Git (já feito!)
2. ✅ Conta no GitHub
3. ✅ Repositório criado no GitHub

---

## 🔗 PASSO 1: Criar Repositório no GitHub

### Opção A: Via GitHub Website

1. Acesse: https://github.com/new
2. Nome: `painel-consultorias-tr`
3. Descrição: `Sistema de Gestão de Agendas e Consultorias TR`
4. **Importante:** NÃO marcar "Initialize with README"
5. Click "Create repository"

### Opção B: Via Comandos (mais rápido)

```bash
# 1. Criar repo no GitHub primeiro (via website)
# 2. Depois executar:

git remote add origin https://github.com/SEU-USUARIO/painel-consultorias-tr.git
git branch -M main
git push -u origin main
```

---

## 🎯 PASSO 2: Deploy no Render

### 1. Acessar Render

Vá para: https://render.com/

### 2. Criar Conta / Login

- Recomendo: **Login com GitHub** (mais fácil)
- Ou criar conta com email

### 3. Criar Novo Web Service

- Click em **"New +"** (canto superior direito)
- Selecione **"Web Service"**

### 4. Conectar Repositório GitHub

- Click em **"Connect a repository"**
- Autorize Render a acessar o GitHub
- Selecione o repositório: **painel-consultorias-tr**
- Click **"Connect"**

### 5. Configurar o Deploy

Preencha os campos:

```
Name: painel-consultorias-tr
  (ou qualquer nome que preferir)

Region: Oregon (US West)
  (escolha a mais próxima)

Branch: main

Root Directory: (deixe vazio)

Runtime: Node

Build Command:
npm install && npm run setup

Start Command:
npm start

Instance Type: Free
```

### 6. Configurar Variáveis de Ambiente

Scroll down até **"Environment Variables"**

Click em **"Add Environment Variable"**

Adicione:

```
Key: JWT_SECRET
Value: [Cole aqui uma chave forte - veja abaixo como gerar]

Key: NODE_ENV
Value: production

Key: PORT
Value: 3000
```

**Para gerar JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Ou use este: `b92eaad9c79e8e5bc3b3626846ec732a1d086ef499db6244c4c300a7509eafea`

### 7. Criar Web Service

- Click em **"Create Web Service"**
- ⏳ Aguarde 3-5 minutos (deploy automático)

### 8. Acompanhar Deploy

Você verá logs em tempo real:
```
==> Installing dependencies
==> Running npm run setup
==> Starting server
==> Deploy successful!
```

---

## ✅ PASSO 3: Acessar o Sistema

Quando aparecer **"Your service is live"**:

1. URL será algo como: `https://painel-consultorias-tr.onrender.com`
2. Click na URL ou copie
3. Abra no navegador
4. Login: `admin` / `admin123`

---

## 🔐 PASSO 4: Segurança Pós-Deploy

**IMPORTANTE - Faça imediatamente:**

1. Faça login como admin
2. Vá em "Usuários" (canto superior direito)
3. **Altere a senha do admin**
4. Crie novos usuários se necessário

---

## 🔄 ATUALIZAÇÕES FUTURAS

Qualquer mudança no código:

```bash
git add .
git commit -m "Descrição da mudança"
git push origin main
```

**Deploy automático!** 🎉

Render detecta o push e faz deploy automaticamente em 2-3 minutos.

---

## 🆘 TROUBLESHOOTING

### Deploy falhou?

**Erro: "npm: command not found"**
- Verificar se Runtime está como "Node"

**Erro: "Port already in use"**
- Remover variável PORT (Render configura automaticamente)

**Erro: "Module not found"**
- Build Command deve ser: `npm install && npm run setup`

**Erro: "Database locked"**
- Normal na primeira vez
- Aguarde 30s e recarregue

### Ver Logs:

No dashboard do Render:
- Click no seu serviço
- Aba "Logs"
- Veja erros em tempo real

### Reiniciar Serviço:

- Settings → Manual Deploy → "Clear build cache & deploy"

---

## 💾 BACKUP DO BANCO

**IMPORTANTE:** SQLite no Render é efêmero!

Opções:

### 1. Exportar dados periodicamente

Via API (criar endpoint):
```javascript
app.get('/api/admin/backup', authenticateToken, (req, res) => {
    // Exportar dados para JSON
});
```

### 2. Migrar para PostgreSQL (futuro)

Render oferece PostgreSQL gratuito.

---

## 📊 MONITORAMENTO

No Dashboard do Render você vê:

- ✅ Status do serviço
- 📊 CPU e memória
- 📈 Tempo de resposta
- 🔄 Últimos deploys
- 📝 Logs em tempo real

---

## 🎉 PRONTO!

Seu sistema está ONLINE e acessível para qualquer pessoa!

**URL Final:** `https://painel-consultorias-tr.onrender.com`

Compartilhe essa URL com sua equipe!

---

## 📞 URLS IMPORTANTES:

- **Dashboard Render:** https://dashboard.render.com
- **Seu App:** https://painel-consultorias-tr.onrender.com
- **Logs:** Dashboard → Seu serviço → Logs

---

## ⚙️ CONFIGURAÇÕES AVANÇADAS (Opcional)

### Custom Domain:

- Settings → Custom Domain
- Adicione seu domínio: `painel.suaempresa.com.br`
- Configure DNS conforme instruções

### Auto Deploy:

- Já está ativado por padrão
- Push no GitHub = Deploy automático

### Health Checks:

- Settings → Health & Alerts
- Configure notificações

---

## 💰 CUSTOS:

**Free Tier:**
- ✅ 750 horas/mês (suficiente para 24/7)
- ✅ HTTPS incluído
- ✅ Deploy automático
- ⚠️ Serviço "hiberna" após 15 min inativo
- ⚠️ Primeiro acesso após hibernar: 30s

**Para remover hibernação:**
- Upgrade para plano pago ($7/mês)

---

## ✅ CHECKLIST FINAL:

- [ ] Repositório no GitHub criado
- [ ] Push do código feito
- [ ] Conta no Render criada
- [ ] Web Service configurado
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy bem-sucedido
- [ ] URL funcionando
- [ ] Login testado
- [ ] Senha do admin alterada
- [ ] URL compartilhada com equipe

---

**Dúvidas? Consulte a documentação do Render: https://render.com/docs**

**Sucesso no deploy! 🚀**
