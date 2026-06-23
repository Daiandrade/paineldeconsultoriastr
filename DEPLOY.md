# 🚀 Guia de Deploy - Sistema SPED TR

## 📋 Pré-requisitos

Antes de colocar em produção, certifique-se de que:

- ✅ Todos os arquivos estão na pasta
- ✅ Sistema foi testado localmente
- ✅ Dados de exemplo foram revisados
- ✅ Login/senha foram configurados

---

## 🌐 Opções de Hospedagem

### **Opção 1: GitHub Pages** (Recomendado - GRATUITO)

#### **Vantagens:**
- ✅ 100% Gratuito
- ✅ HTTPS automático
- ✅ Deploy automático via Git
- ✅ Fácil de atualizar

#### **Passos:**

1. **Criar Repositório no GitHub**
```bash
# No terminal, dentro da pasta do projeto
git init
git add .
git commit -m "Initial commit - Sistema SPED TR"
```

2. **Criar Repositório no GitHub.com**
   - Ir para https://github.com/new
   - Nome: `sistema-sped-tr`
   - Público ou Privado (privado requer GitHub Pro para Pages)
   - NÃO inicializar com README

3. **Conectar e Enviar**
```bash
git remote add origin https://github.com/SEU-USUARIO/sistema-sped-tr.git
git branch -M main
git push -u origin main
```

4. **Habilitar GitHub Pages**
   - Ir em: Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Salvar

5. **Aguardar Deploy** (2-5 minutos)
   - URL: `https://SEU-USUARIO.github.io/sistema-sped-tr/`

---

### **Opção 2: Netlify** (Recomendado - GRATUITO)

#### **Vantagens:**
- ✅ 100% Gratuito
- ✅ HTTPS automático
- ✅ Deploy por Drag & Drop
- ✅ Domínio customizado grátis
- ✅ Formulários e funções serverless

#### **Passos:**

1. **Acessar** https://www.netlify.com/

2. **Criar Conta** (GitHub, GitLab, ou Email)

3. **Deploy Manual (Drag & Drop):**
   - Clicar em "Sites" → "Add new site" → "Deploy manually"
   - **Arrastar a pasta completa do projeto**
   - Deploy automático em segundos
   - URL: `https://random-name.netlify.app`

4. **OU Deploy via Git:**
   - "Add new site" → "Import an existing project"
   - Conectar GitHub
   - Selecionar repositório
   - Deploy automático a cada push

5. **Configurar Domínio Customizado** (Opcional)
   - Site settings → Domain management
   - Add custom domain: `sped.suaempresa.com.br`

---

### **Opção 3: Vercel** (Moderno - GRATUITO)

#### **Vantagens:**
- ✅ 100% Gratuito
- ✅ Deploy super rápido
- ✅ Analytics incluído
- ✅ Preview de branches

#### **Passos:**

1. **Acessar** https://vercel.com/

2. **Criar Conta** (GitHub recomendado)

3. **New Project** → Import Git Repository

4. **Selecionar repositório** `sistema-sped-tr`

5. **Deploy** (automático)
   - URL: `https://sistema-sped-tr.vercel.app`

---

### **Opção 4: Servidor Próprio** (Avançado)

#### **Nginx (Linux):**

1. **Copiar arquivos para servidor**
```bash
scp -r * usuario@servidor:/var/www/sped-sistema/
```

2. **Configurar Nginx**
```nginx
# /etc/nginx/sites-available/sped-sistema
server {
    listen 80;
    server_name sped.suaempresa.com.br;
    root /var/www/sped-sistema;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache de assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Ativar site**
```bash
sudo ln -s /etc/nginx/sites-available/sped-sistema /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

4. **HTTPS com Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d sped.suaempresa.com.br
```

#### **Apache (Linux/Windows):**

1. **Copiar para pasta do Apache**
```bash
# Linux
cp -r * /var/www/html/sped-sistema/

# Windows
# Copiar para C:\xampp\htdocs\sped-sistema\
```

2. **Configurar .htaccess**
```apache
# .htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# Cache
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

---

## 🔒 Segurança em Produção

### **1. Alterar Credenciais Padrão**

Editar `app.js`:

```javascript
const defaultUsers = [
    { username: 'admin', password: 'SENHA_FORTE_AQUI', name: 'Administrador' },
    { username: 'usuario', password: 'OUTRA_SENHA_FORTE', name: 'Nome Usuário' }
];
```

**Senhas fortes:**
- Mínimo 12 caracteres
- Letras maiúsculas e minúsculas
- Números e símbolos
- Exemplo: `Tr@2026#Sped!Br`

### **2. HTTPS Obrigatório**

- GitHub Pages: automático ✓
- Netlify: automático ✓
- Vercel: automático ✓
- Servidor próprio: usar Let's Encrypt

### **3. Backup dos Dados**

O sistema usa `localStorage`. Para backup:

**Exportar dados:**
```javascript
// Abrir Console (F12) no navegador
const backup = {
    users: localStorage.getItem('users'),
    consultores: localStorage.getItem('consultores'),
    produtos: localStorage.getItem('produtos'),
    roadmap: localStorage.getItem('roadmap'),
    temas: localStorage.getItem('temas'),
    agendas: localStorage.getItem('agendas'),
    data: new Date().toISOString()
};

console.log(JSON.stringify(backup));
// Copiar e salvar em arquivo .json
```

**Importar dados:**
```javascript
// Cole o conteúdo do backup
const backup = {/* ... dados ... */};

Object.keys(backup).forEach(key => {
    if (key !== 'data') {
        localStorage.setItem(key, backup[key]);
    }
});

location.reload();
```

### **4. Restringir Acesso (Opcional)**

Para ambientes corporativos:

**Netlify/Vercel:**
- Usar plano pago com autenticação
- Ou senha única via Netlify Identity

**Servidor Próprio:**
```nginx
# Basic Auth no Nginx
location / {
    auth_basic "Área Restrita";
    auth_basic_user_file /etc/nginx/.htpasswd;
    try_files $uri $uri/ /index.html;
}
```

```bash
# Criar usuário
sudo htpasswd -c /etc/nginx/.htpasswd admin
```

---

## 📦 Otimização para Produção

### **1. Minificar CSS (Opcional)**

Use: https://cssminifier.com/
- Colar conteúdo de `styles.css`
- Copiar resultado minificado
- Substituir arquivo

### **2. Minificar JavaScript (Opcional)**

Use: https://javascript-minifier.com/
- Colar conteúdo de `app.js`
- Copiar resultado minificado
- Substituir arquivo

### **3. Compressão Gzip**

**Nginx:**
```nginx
gzip on;
gzip_types text/css application/javascript text/html;
gzip_min_length 1000;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

---

## 🔄 Atualização em Produção

### **GitHub Pages / Netlify / Vercel (via Git):**

```bash
# Fazer alterações nos arquivos localmente
git add .
git commit -m "Descrição da atualização"
git push origin main

# Deploy automático em 1-2 minutos
```

### **Netlify (Drag & Drop):**

1. Ir no site da Netlify
2. Clicar em "Deploys"
3. Arrastar nova versão da pasta
4. Deploy instantâneo

### **Servidor Próprio:**

```bash
# Via SCP
scp -r * usuario@servidor:/var/www/sped-sistema/

# Via FTP
# Usar FileZilla ou WinSCP
```

---

## 📊 Monitoramento

### **Logs de Acesso:**

**Netlify/Vercel:**
- Dashboard → Analytics
- Ver acessos, tempo de carregamento

**Servidor Próprio:**
```bash
# Nginx
tail -f /var/log/nginx/access.log

# Apache
tail -f /var/log/apache2/access.log
```

### **Erros JavaScript:**

Adicionar no início do `app.js`:

```javascript
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Erro:', msg, 'Linha:', lineNo);
    // Opcional: enviar para serviço de log
    return false;
};
```

---

## ✅ Checklist de Deploy

Antes de colocar em produção:

- [ ] Testar login com novos usuários
- [ ] Verificar todas as abas do modal
- [ ] Criar/editar/excluir agenda
- [ ] Criar/editar/excluir consultor
- [ ] Criar/editar/excluir produto
- [ ] Criar/editar/excluir roadmap
- [ ] Testar filtros
- [ ] Testar visualizações (Kanban/Timeline)
- [ ] Testar em mobile
- [ ] Alterar senhas padrão
- [ ] Fazer backup dos dados
- [ ] Configurar HTTPS
- [ ] Testar link de produção
- [ ] Documentar URL e credenciais

---

## 🆘 Troubleshooting

### **Problema: Página em branco**
- Verificar console do navegador (F12)
- Verificar se todos os arquivos foram enviados
- Verificar permissões dos arquivos

### **Problema: Dados não salvam**
- localStorage funciona apenas com HTTPS
- Verificar se navegador permite localStorage
- Testar em modo anônimo

### **Problema: Erros 404**
- Verificar caminho dos arquivos
- Configurar redirecionamento para index.html

---

## 📞 URLs de Exemplo

Após deploy, o sistema estará disponível em:

**GitHub Pages:**
```
https://seu-usuario.github.io/sistema-sped-tr/
```

**Netlify:**
```
https://sistema-sped-tr.netlify.app/
(ou domínio customizado)
```

**Vercel:**
```
https://sistema-sped-tr.vercel.app/
```

**Servidor Próprio:**
```
https://sped.suaempresa.com.br/
```

---

## 🎯 Próximos Passos

Após deploy em produção:

1. ✅ Compartilhar URL com equipe
2. ✅ Treinar usuários
3. ✅ Configurar backup automático
4. ✅ Monitorar uso
5. ✅ Coletar feedback
6. ✅ Planejar melhorias

---

**Versão**: 2.2.0  
**Status**: ✅ Pronto para Produção  
**Suporte**: Documentação completa incluída