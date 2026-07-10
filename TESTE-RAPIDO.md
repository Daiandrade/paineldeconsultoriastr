# 🧪 Teste Rápido - Verificar se Funciona

## 1️⃣ Iniciar Servidor

```bash
cd "C:\Users\6119138\OneDrive - Thomson Reuters Incorporated\Documents\Projetos Claude\Painel de agendas e consultorias"
npm start
```

**Esperado:** Servidor rodando na porta 3000

---

## 2️⃣ Abrir Navegador

Abra: http://localhost:3000

**Esperado:** Tela de login aparece

---

## 3️⃣ Fazer Login

```
Usuário: admin
Senha: admin123
```

**Esperado:** Dashboard aparece com estatísticas

---

## 4️⃣ Criar Nova Agenda

1. Clicar em "Agendas" no menu
2. Clicar em "+ Nova Agenda"
3. Preencher:
   - Consultor: Qualquer um
   - Cliente: "Teste Cliente API"
   - Data: Hoje
   - Hora: 14:00
   - Tema: Qualquer um
   - Duração: 60
4. Clicar "Salvar"

**Esperado:**
- ✅ Agenda criada com sucesso
- ✅ Aparece na lista
- ✅ Console (F12) mostra: `POST /api/agendas` (status 200 ou 201)

---

## 5️⃣ Teste de Compartilhamento (CRÍTICO!)

### Passo A: Verificar Agenda Atual
- A agenda "Teste Cliente API" está na lista? ✅

### Passo B: Abrir Janela Anônima
- **Chrome/Edge:** `Ctrl + Shift + N`
- **Firefox:** `Ctrl + Shift + P`

### Passo C: Fazer Login Novamente
- Acesse http://localhost:3000
- Login: admin / admin123

### Passo D: Verificar Lista
**MOMENTO DA VERDADE:**

✅ **SUCESSO:** A agenda "Teste Cliente API" APARECE na lista!  
❌ **FALHA:** A lista está vazia ou não aparece a agenda

---

## 📊 Resultados Esperados

### ✅ Se Tudo Funcionou:
- Login funcionou
- Agenda criada
- Console mostra POST /api/agendas
- **Agenda aparece na janela anônima**

**🎉 Migração FUNCIONOU! Dados estão sendo compartilhados!**

### ❌ Se Falhou:

#### Problema 1: Erro ao criar agenda
**Console mostra:** `POST /api/agendas failed`

**Soluções:**
1. Verificar se servidor está rodando
2. Ver logs do servidor no terminal
3. Verificar se banco de dados está configurado

```bash
# Ver status do servidor
# Terminal deve mostrar: "✅ Conectado ao banco"
```

#### Problema 2: Agenda não aparece na janela anônima
**Possíveis causas:**

A) **Backend não está salvando**
```bash
# Ver logs do servidor
# Deve aparecer: INSERT INTO agendas...
```

B) **Frontend ainda usa localStorage em algum lugar**
```javascript
// Abrir Console (F12) e executar:
localStorage.getItem('agendas')
// Se retornar algo, ainda tem localStorage ativo
```

C) **API não está conectada ao banco**
```bash
# Verificar arquivo .env
# Deve ter: TURSO_DATABASE_URL e TURSO_AUTH_TOKEN
```

---

## 🔍 Debug Avançado

### Ver Requisições de Rede
1. Abrir DevTools (F12)
2. Aba "Network"
3. Criar agenda
4. Verificar:
   - POST `/api/agendas` → Status 200/201 ✅
   - Response: `{"id": 1, ...}` ✅

### Ver Dados no Banco
```bash
# Se estiver usando SQLite local:
sqlite3 database.db "SELECT * FROM agendas;"

# Ou via Node:
node -e "const db = require('better-sqlite3')('database.db'); console.log(db.prepare('SELECT * FROM agendas').all());"
```

---

## 🎯 Checklist Final

- [ ] Servidor inicia sem erros
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Criar agenda funciona
- [ ] Console mostra POST /api/agendas (200)
- [ ] **Agenda aparece em janela anônima** ⭐
- [ ] Editar agenda funciona
- [ ] Deletar agenda funciona
- [ ] Criar consultor funciona
- [ ] Criar produto funciona
- [ ] Criar roadmap funciona

---

## 💡 Comandos Úteis

### Ver todas as agendas via API:
```bash
curl http://localhost:3000/api/agendas
```

### Ver todos os consultores:
```bash
curl http://localhost:3000/api/consultores
```

### Resetar banco de dados:
```bash
npm run setup
```

---

## 🚀 Se Tudo Funcionou

**Parabéns! O sistema está pronto para produção!**

Próximos passos:
1. Fazer deploy no Netlify
2. Configurar variáveis de ambiente em produção
3. Testar em produção
4. Alterar senhas padrão

---

## 📞 Suporte

Se algo não funcionar:
1. Verificar logs do servidor
2. Ver console do navegador (F12)
3. Ler os arquivos de documentação:
   - `PROBLEMA-HISTORICO.md` - Diagnóstico
   - `MIGRACAO-COMPLETA.md` - O que foi feito
   - `MIGRACAO-API.md` - Detalhes técnicos

**Tempo estimado do teste:** 5-10 minutos
