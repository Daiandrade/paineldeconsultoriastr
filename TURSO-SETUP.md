# 🚀 Setup Turso Database

## 📋 Passo 1: Criar conta e instalar CLI

### 1.1 Criar conta no Turso
1. Acesse [turso.tech](https://turso.tech)
2. Clique em "Sign Up" e faça login com GitHub

### 1.2 Instalar Turso CLI

**Windows (PowerShell):**
```powershell
irm https://get.turso.tech/install.ps1 | iex
```

**Linux/Mac:**
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

---

## 📋 Passo 2: Autenticar e criar database

### 2.1 Login no Turso
```bash
turso auth login
```

### 2.2 Criar o database
```bash
turso db create painel-consultorias-tr
```

### 2.3 Obter credenciais

**URL do database:**
```bash
turso db show painel-consultorias-tr --url
```
Copie a URL (exemplo: `libsql://painel-consultorias-tr-usuario.turso.io`)

**Token de autenticação:**
```bash
turso db tokens create painel-consultorias-tr
```
Copie o token gerado

---

## 📋 Passo 3: Configurar variáveis de ambiente

### 3.1 Criar arquivo .env local

Crie o arquivo `.env` na raiz do projeto:

```env
# JWT Secret
JWT_SECRET=seu-secret-super-seguro-aqui

# Turso Database
TURSO_DATABASE_URL=libsql://painel-consultorias-tr-SEU-USUARIO.turso.io
TURSO_AUTH_TOKEN=seu-token-aqui

# Porta (opcional)
PORT=3000
```

⚠️ **IMPORTANTE:** Não commite o arquivo `.env` no Git!

### 3.2 Configurar no Netlify

1. Acesse o dashboard do seu site no Netlify
2. Vá em **Site settings → Environment variables**
3. Adicione as variáveis:
   - `JWT_SECRET` = seu-secret-forte
   - `TURSO_DATABASE_URL` = sua-url-do-turso
   - `TURSO_AUTH_TOKEN` = seu-token-do-turso

---

## 📋 Passo 4: Inicializar o banco de dados

### 4.1 Instalar dependências
```bash
npm install
```

### 4.2 Rodar o servidor (modo desenvolvimento)
```bash
# Usar o novo servidor com Turso
node server-turso.js
```

O servidor vai:
- ✅ Conectar no Turso (se configurado)
- ✅ Criar todas as tabelas automaticamente
- ✅ Criar usuário admin padrão (admin/admin123)

---

## 📋 Passo 5: Atualizar package.json

Abra o `package.json` e atualize os scripts:

```json
"scripts": {
  "start": "node server-turso.js",
  "dev": "nodemon server-turso.js",
  "local": "node server.js"
}
```

---

## 📋 Passo 6: Atualizar Netlify para usar Turso

### 6.1 Atualizar netlify.toml

Abra `netlify.toml` e modifique a função:

```toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server-turso/:splat"
  status = 200
```

### 6.2 Renomear a função do Netlify

```bash
# Renomear o arquivo da função
mv netlify/functions/server.js netlify/functions/server-old.js
mv netlify/functions/server-turso.js netlify/functions/server.js
```

Ou simplesmente delete o antigo e use o novo.

---

## 🧪 Passo 7: Testar localmente

### 7.1 Testar com Turso
```bash
npm start
```
Acesse: http://localhost:3000

### 7.2 Testar com SQLite local (sem Turso configurado)
Se você **não** configurar as variáveis `TURSO_*` no `.env`, o sistema automaticamente usa SQLite local para desenvolvimento.

---

## 📋 Passo 8: Deploy no Netlify

### 8.1 Commit e push
```bash
git add .
git commit -m "Configurado para usar Turso"
git push
```

### 8.2 Verificar deploy
O Netlify vai fazer deploy automático e usar o Turso configurado nas variáveis de ambiente.

---

## 🔍 Comandos úteis do Turso CLI

```bash
# Listar seus databases
turso db list

# Ver informações do database
turso db show painel-consultorias-tr

# Abrir shell SQL
turso db shell painel-consultorias-tr

# Ver uso/estatísticas
turso db inspect painel-consultorias-tr

# Criar backup
turso db backup painel-consultorias-tr

# Deletar database (cuidado!)
turso db destroy painel-consultorias-tr
```

---

## 🗄️ Executar SQL direto no Turso

### Via CLI:
```bash
turso db shell painel-consultorias-tr

# Dentro do shell:
SELECT * FROM users;
SELECT * FROM consultores;
```

### Via código (em setup.js por exemplo):
Você pode criar scripts de migração/seed usando o mesmo `db-turso.js`.

---

## ✅ Checklist de Setup

- [ ] Conta criada no Turso
- [ ] Turso CLI instalado
- [ ] Login feito (`turso auth login`)
- [ ] Database criado
- [ ] URL e Token copiados
- [ ] `.env` configurado localmente
- [ ] Variáveis configuradas no Netlify
- [ ] Dependências instaladas (`npm install`)
- [ ] Servidor testado localmente
- [ ] Deploy feito no Netlify
- [ ] Login testado (admin/admin123)

---

## 🆘 Troubleshooting

### Erro: "TURSO_DATABASE_URL not found"
- Verifique se o `.env` está na raiz do projeto
- Verifique se as variáveis estão configuradas no Netlify

### Erro: "Authentication failed"
- Verifique se o token está correto
- Gere um novo token: `turso db tokens create painel-consultorias-tr`

### Dados não persistem
- Verifique se está usando o servidor correto (`server-turso.js`)
- Verifique se as variáveis de ambiente estão corretas

### Modo desenvolvimento vs produção
- **SEM** variáveis Turso = SQLite local (dev)
- **COM** variáveis Turso = Turso na nuvem (prod)

---

## 📚 Recursos

- [Documentação Turso](https://docs.turso.tech)
- [Turso CLI Reference](https://docs.turso.tech/reference/turso-cli)
- [LibSQL Client](https://github.com/tursodatabase/libsql-client-ts)

---

## 🎉 Pronto!

Seu sistema agora usa:
- ☁️ **Turso** em produção (Netlify)
- 💾 **SQLite** local para desenvolvimento
- 🔄 Código 100% compatível entre ambos
