# 🔌 Guia de Integração API - Passo a Passo

## ⚠️ IMPORTANTE

O backend está **100% pronto e funcionando**, mas o frontend ainda usa **localStorage**.

Temos 2 opções:

### Opção 1: Adaptação Completa (Recomendado para Produção)
**Tempo:** ~30 minutos
**Vantagem:** Sistema 100% integrado com backend real
**Desvantagem:** Precisa testar tudo novamente

### Opção 2: Modo Híbrido (Rápido para Demo)
**Tempo:** ~5 minutos  
**Vantagem:** Sistema funciona imediatamente
**Desvantagem:** Ainda usa localStorage, não aproveita o backend

---

## 🎯 Recomendação: Opção 1 (Adaptação Completa)

Vou criar um **novo arquivo `app-backend.js`** que substitui o `app.js` atual.

### O que será adaptado:

1. ✅ **Login/Autenticação** → API `/api/auth/login`
2. ✅ **CRUD Agendas** → API `/api/agendas`
3. ✅ **CRUD Consultores** → API `/api/consultores`
4. ✅ **CRUD Produtos** → API `/api/produtos`
5. ✅ **CRUD Temas** → API `/api/temas`
6. ✅ **CRUD Roadmap** → API `/api/roadmap`
7. ✅ **CRUD Usuários** → API `/api/users` (apenas admin)
8. ✅ **Estatísticas** → API `/api/stats`

### Mudanças necessárias:

**NO INDEX.HTML:**
```html
<!-- Trocar -->
<script src="app.js"></script>

<!-- Por -->
<script src="app-backend.js"></script>
```

**Ou fazer backup e substituir:**
```bash
mv app.js app-localStorage-backup.js
mv app-backend.js app.js
```

---

## 🚀 Quer que eu faça a adaptação completa agora?

**Opções:**

**A)** Criar `app-backend.js` completo (arquivo novo, não afeta o atual)
**B)** Substituir `app.js` diretamente (fazer backup automático)
**C)** Fazer manualmente depois (eu te dou o código)

**Escolha A, B ou C**

---

## 📋 Status Atual

✅ Backend rodando: http://localhost:3000
✅ API funcionando: http://localhost:3000/api
✅ Banco de dados: Configurado
✅ Dados iniciais: Carregados
⏳ Frontend: **Aguardando integração**

---

## 🔍 Como testar se backend está OK

Abra uma nova aba PowerShell e teste:

```powershell
# Teste 1: Login
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{\"username\":\"admin\",\"password\":\"admin123\"}'

# Deve retornar um token JWT
```

Se funcionar, o backend está perfeito! ✅

---

**Qual opção você prefere? A, B ou C?**
