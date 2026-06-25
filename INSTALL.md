# 📦 Guia de Instalação Rápida - Painel de Consultorias TR

## ⚡ Quick Start (3 minutos)

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar ambiente

```bash
# Copiar arquivo de configuração
cp .env.example .env

# Gerar chave JWT forte
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Editar .env e colar a chave gerada no JWT_SECRET
```

### 3. Configurar banco de dados

```bash
npm run setup
```

### 4. Iniciar servidor

```bash
npm start
```

### 5. Acessar sistema

Abra o navegador em: **http://localhost:3000**

**Login padrão:**
- Usuário: `admin`
- Senha: `admin123`

---

## 🔐 Primeiro Acesso

1. Faça login com `admin` / `admin123`
2. Vá em **Usuários** (canto superior direito)
3. **Altere a senha do admin** imediatamente
4. Crie novos usuários conforme necessário

---

## 🧪 Modo Desenvolvimento

Para desenvolvimento com auto-reload:

```bash
npm run dev
```

---

## 📱 Funcionalidades Disponíveis

Após login, você terá acesso a:

✅ **Agendas** - Gerenciar consultorias
✅ **Consultores** - Cadastro de consultores
✅ **Produtos** - Produtos TR (SPED, Reinf, etc.)
✅ **Roadmap** - Planejamento de features
✅ **Temas** - Temas de consultoria
✅ **Relatórios** - Dashboards e análises
✅ **Usuários** - Gerenciar acessos (apenas admin)

---

## 🆘 Problemas Comuns

### "Cannot find module 'express'"
```bash
npm install
```

### "Port 3000 already in use"
```bash
# Mude a porta no .env
PORT=3001
```

### "database.db locked"
```bash
# Feche outras conexões ao banco
# Ou delete e recrie:
rm database.db
npm run setup
```

---

## 📚 Próximos Passos

- 📖 Leia o [DEPLOY-BACKEND.md](DEPLOY-BACKEND.md) para colocar em produção
- 🔐 Configure backups automáticos
- 👥 Cadastre seus consultores
- 📅 Crie suas primeiras agendas

---

## 💡 Dicas

- Use **Ctrl+C** para parar o servidor
- Logs aparecem no terminal em tempo real
- O banco SQLite fica em `database.db`
- Faça backups regulares do `database.db`

---

**Versão**: 2.3.0
**Suporte**: Consulte os arquivos MD na raiz do projeto
