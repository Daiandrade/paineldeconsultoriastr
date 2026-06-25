# 🎨 Deploy no Glitch - Passo a Passo

## ✅ Vantagens do Glitch:
- ✅ 100% GRATUITO
- ✅ Editor online incluído
- ✅ Deploy instantâneo
- ✅ Import direto do GitHub
- ✅ HTTPS automático
- ✅ Super fácil de usar

---

## 🚀 DEPLOY EM 5 MINUTOS!

### PASSO 1: Criar Conta no Glitch

1. Acesse: **https://glitch.com**
2. Click em **"Sign Up"** (canto superior direito)
3. Escolha: **"Sign up with GitHub"** (mais fácil!)
4. Autorize o Glitch

---

### PASSO 2: Importar do GitHub

1. Na página inicial do Glitch, click em **"New Project"**
2. Selecione **"Import from GitHub"**
3. Cole a URL do seu repositório:
   ```
   https://github.com/Daiandrade/paineldeconsultoriastr
   ```
4. Click em **"OK"**
5. ⏳ Aguarde 1-2 minutos (importando...)

---

### PASSO 3: Configurar Variáveis de Ambiente

1. No editor do Glitch que abriu, procure o arquivo **`.env`** na barra lateral esquerda
2. Se não existir, click em **"New File"** e nomeie como `.env`
3. Adicione estas linhas:

```env
JWT_SECRET=b92eaad9c79e8e5bc3b3626846ec732a1d086ef499db6244c4c300a7509eafea
NODE_ENV=production
PORT=3000
```

4. O Glitch salva automaticamente ✅

---

### PASSO 4: Configurar package.json (se necessário)

1. Abra o arquivo **`package.json`**
2. Verifique se tem esta seção (já deve ter):

```json
"scripts": {
  "start": "node server.js",
  "setup": "node setup-db.js"
}
```

3. Se não tiver, adicione

---

### PASSO 5: Executar Setup do Banco

1. Click no botão **"Terminal"** no rodapé do Glitch (ou Tools → Terminal)
2. Digite:
   ```bash
   npm run setup
   ```
3. Aguarde aparecer: ✅ "Banco de dados configurado com sucesso!"
4. Feche o terminal

---

### PASSO 6: Iniciar o Projeto

O Glitch inicia automaticamente, mas se precisar:

1. Click no botão **"Terminal"** novamente
2. Digite:
   ```bash
   refresh
   ```

Ou simplesmente edite qualquer arquivo (adicione um espaço) e salve - o Glitch reinicia automaticamente!

---

### PASSO 7: Ver seu Site Online!

1. Click em **"Share"** (canto superior direito)
2. Ou click em **"Show"** → **"In a New Window"**
3. Sua URL será algo como:
   ```
   https://nome-do-projeto.glitch.me
   ```

---

## 🎉 TESTAR!

1. Acesse a URL do seu projeto
2. Faça login:
   ```
   Usuário: admin
   Senha: admin123
   ```
3. **ALTERE A SENHA imediatamente!**

---

## 🔧 DICAS DO GLITCH:

### **Ver Logs:**
- Click em "Logs" no rodapé
- Veja erros em tempo real

### **Editar Código:**
- Edite direto no navegador
- Salva automaticamente
- Reinicia automaticamente

### **Renomear Projeto:**
- Settings → Edit project details
- Mude o nome para algo melhor: `painel-consultorias-tr`

### **Custom Domain (Opcional - Pago):**
- Settings → Custom Domain
- Pode adicionar seu domínio

### **Manter Ativo:**
- Glitch "hiberna" após 5min sem uso
- Primeiro acesso demora ~10s
- Para evitar: Upgrade para plano pago ($8/mês)

---

## 🔄 ATUALIZAÇÕES FUTURAS:

### Método 1: Direto no Glitch
- Edite os arquivos no editor do Glitch
- Salva e atualiza automaticamente

### Método 2: Via GitHub
1. Faça alterações locais
2. Commit e push:
   ```bash
   git add .
   git commit -m "Atualização X"
   git push origin main
   ```
3. No Glitch:
   - Tools → Git, Import, and Export
   - Import from GitHub
   - Cole a URL novamente
   - Confirme

---

## 💾 BACKUP DO BANCO:

**IMPORTANTE:** Glitch pode limpar o banco periodicamente!

### Fazer Backup:

1. Terminal do Glitch:
   ```bash
   cp database.db database-backup.db
   ```

2. Download:
   - Click em "Assets"
   - Upload `database.db`
   - Depois pode baixar quando precisar

### Solução Permanente:
- Migrar para PostgreSQL (futuro)
- Ou fazer backups regulares

---

## 🆘 TROUBLESHOOTING:

### Projeto não inicia?
```bash
# Terminal do Glitch:
npm install
npm run setup
refresh
```

### Erro "Port in use"?
- Glitch usa porta dinâmica
- Não precisa especificar PORT no código
- Use: `process.env.PORT || 3000`

### Banco vazio?
```bash
npm run setup
```

### Erro de permissão?
- Verifique se `.env` está configurado
- JWT_SECRET deve estar presente

---

## 📊 MONITORAMENTO:

No Dashboard do Glitch você vê:
- ✅ Status do projeto
- 📊 Logs em tempo real
- 🔄 Último deploy
- 👥 Visitantes

---

## 💡 RECURSOS DO GLITCH:

### Gratuito:
- ✅ 1000 horas/mês
- ✅ Projetos ilimitados
- ✅ HTTPS incluído
- ⚠️ Hiberna após inatividade

### Boosted ($8/mês):
- ✅ Sempre ativo
- ✅ Mais recursos
- ✅ Sem hibernação

---

## ✅ CHECKLIST:

- [ ] Conta criada no Glitch
- [ ] Projeto importado do GitHub
- [ ] `.env` configurado
- [ ] `npm run setup` executado
- [ ] Site funcionando
- [ ] Login testado
- [ ] Senha alterada
- [ ] URL compartilhada

---

## 🎊 PRONTO!

Seu sistema está ONLINE no Glitch!

**URL:** https://[seu-projeto].glitch.me

**Compartilhe com sua equipe!** 🚀

---

## 📞 LINKS ÚTEIS:

- **Glitch Dashboard:** https://glitch.com/dashboard
- **Documentação:** https://glitch.com/help
- **Suporte:** https://support.glitch.com

---

**Dúvidas? Me chame! Seu sistema está no ar! 🎉**
