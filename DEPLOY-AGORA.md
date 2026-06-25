# 🚀 DEPLOY AGORA - 5 Minutos!

## ⚡ RÁPIDO E FÁCIL

Siga exatamente estes passos:

---

## 📝 PASSO 1: GitHub (2 minutos)

### 1.1 Criar Repositório

1. Abra: https://github.com/new
2. Nome: `painel-consultorias-tr`
3. **NÃO** marque "Add README"
4. Click "Create repository"

### 1.2 Enviar Código

Na tela que aparecer, copie os comandos da seção **"push an existing repository"**:

```bash
git remote add origin https://github.com/SEU-USUARIO/painel-consultorias-tr.git
git branch -M main
git push -u origin main
```

Cole no PowerShell e execute!

---

## 🌐 PASSO 2: Render (3 minutos)

### 2.1 Criar Conta

1. Abra: https://render.com
2. Click "Get Started"
3. **Login com GitHub** (mais fácil!)
4. Autorize o Render

### 2.2 Criar Web Service

1. Click "New +" → "Web Service"
2. Click "Connect a repository"
3. Selecione `painel-consultorias-tr`
4. Click "Connect"

### 2.3 Configurar

Preencha:

```
Name: painel-consultorias-tr
Runtime: Node
Build Command: npm install && npm run setup
Start Command: npm start
Instance Type: Free
```

### 2.4 Variáveis de Ambiente

Click "Add Environment Variable" e adicione:

```
JWT_SECRET = b92eaad9c79e8e5bc3b3626846ec732a1d086ef499db6244c4c300a7509eafea
NODE_ENV = production
```

### 2.5 Deploy!

Click **"Create Web Service"**

⏳ **Aguarde 3-5 minutos...**

---

## ✅ PASSO 3: Testar (1 minuto)

Quando aparecer "Your service is live":

1. Click na URL (tipo: `https://painel-consultorias-tr.onrender.com`)
2. Login: `admin` / `admin123`
3. **ALTERE A SENHA!**

---

## 🎉 PRONTO!

Seu sistema está ONLINE!

**URL:** https://painel-consultorias-tr.onrender.com (a sua será diferente)

Compartilhe com sua equipe! 🚀

---

## 📞 Problemas?

Leia: **DEPLOY-RENDER.md** (guia completo)

---

## ⏭️ Próximos Passos:

- [ ] Alterar senha do admin
- [ ] Criar usuários da equipe
- [ ] Cadastrar consultores reais
- [ ] Compartilhar URL
- [ ] Começar a usar!

**Aproveite!** 🎊
