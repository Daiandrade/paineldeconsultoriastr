# 🔄 Guia de Migração localStorage → API REST

## ✅ Status Atual

### Concluído:
- ✅ Criado `config.js` com helpers de API
- ✅ Migrado `login()` para usar `/api/auth/login`
- ✅ Migrado `logout()` para limpar token
- ✅ Migrado `initApp()` para verificar token
- ✅ Migrado `loadDashboardData()` para usar API
- ✅ Migrado `updateStats()` para `/api/agendas` e `/api/consultores`
- ✅ Migrado `loadAgendas()` para `/api/agendas`
- ✅ Migrado `loadConsultores()` para `/api/consultores`

### Pendente - CRÍTICO (impede compartilhamento de dados):

#### 1. AGENDAS - Funções de escrita
- [ ] `saveAgenda()` - linha 618 → POST/PUT `/api/agendas`
- [ ] `deleteAgenda()` - linha 699 → DELETE `/api/agendas/:id`
- [ ] `editAgenda()` - buscar agenda → GET `/api/agendas/:id`
- [ ] `filterAgendas()` - linha 482 → usar dados já carregados ou filtrar no backend

#### 2. CONSULTORES - Funções de escrita
- [ ] `saveConsultor()` → POST/PUT `/api/consultores`
- [ ] `deleteConsultor()` → DELETE `/api/consultores/:id`
- [ ] `editConsultor()` → GET `/api/consultores/:id`

#### 3. PRODUTOS - Todas as funções
- [ ] `loadProdutos()` - linha 1277 → GET `/api/produtos`
- [ ] `saveProduto()` → POST/PUT `/api/produtos`
- [ ] `deleteProduto()` → DELETE `/api/produtos/:id`

#### 4. ROADMAP - Todas as funções
- [ ] `loadRoadmap()` - linha 1574 → GET `/api/roadmap`
- [ ] `saveRoadmapItem()` → POST/PUT `/api/roadmap`
- [ ] `deleteRoadmapItem()` → DELETE `/api/roadmap/:id`

#### 5. TEMAS - Todas as funções
- [ ] `loadTemas()` → GET `/api/temas`
- [ ] `saveTema()` → POST/PUT `/api/temas`
- [ ] `deleteTema()` → DELETE `/api/temas/:id`

#### 6. USUÁRIOS (Admin) - Todas as funções
- [ ] `loadUsuarios()` → GET `/api/users` (apenas admin)
- [ ] `saveUsuario()` → POST/PUT `/api/users`
- [ ] `deleteUsuario()` → DELETE `/api/users/:id`

#### 7. FUNÇÕES AUXILIARES
- [ ] `recalcularAgendasConsultores()` - chamar após operações de agenda
- [ ] `populateSelects()` - usar dados da API em vez de localStorage
- [ ] Todas as funções de visualização que fazem `JSON.parse(localStorage.getItem(...))`

---

## 📋 Padrão de Migração

### ANTES (localStorage):
```javascript
function loadProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    // ... render
}

function saveProduto() {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    // ... logic
    localStorage.setItem('produtos', JSON.stringify(produtos));
    loadProdutos();
}
```

### DEPOIS (API):
```javascript
async function loadProdutos() {
    try {
        const produtos = await api.get('/api/produtos');
        // ... render
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

async function saveProduto() {
    try {
        const produtoData = {/* ... */};
        if (editingId) {
            await api.put(`/api/produtos/${editingId}`, produtoData);
        } else {
            await api.post('/api/produtos', produtoData);
        }
        await loadProdutos();
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        alert('Erro ao salvar. Tente novamente.');
    }
}
```

---

## 🎯 Próximos Passos URGENTES

1. **Migrar saveAgenda() e deleteAgenda()** - SEM ISSO OS DADOS NÃO SÃO COMPARTILHADOS!
2. **Migrar saveConsultor() e deleteConsultor()**
3. **Migrar loadProdutos(), loadRoadmap(), loadTemas()**
4. **Migrar todas as funções save/delete restantes**
5. **Remover todas as referências a localStorage de dados (manter apenas token)**
6. **Testar fluxo completo: login → criar agenda → logout → login em outro navegador → verificar dados**

---

## ⚠️ IMPORTANTE

### O que MANTER no localStorage:
- ✅ Token JWT (`CONFIG.TOKEN_KEY`)
- ✅ Dados do usuário atual (`CONFIG.USER_KEY`)

### O que REMOVER do localStorage:
- ❌ Agendas
- ❌ Consultores
- ❌ Produtos
- ❌ Roadmap
- ❌ Temas
- ❌ Usuários (lista completa)

---

## 🧪 Como Testar Compartilhamento

1. Fazer login como `admin`
2. Criar uma agenda nova
3. Abrir uma janela anônima
4. Fazer login como `admin` novamente
5. **Verificar se a agenda aparece** ← SE NÃO APARECER, O PROBLEMA AINDA EXISTE

---

## 📊 Progresso

**Total de ocorrências localStorage:** 58  
**Migradas:** ~10 (login, load functions)  
**Pendentes:** ~48 (save/delete/view functions)

**Estimativa:** 2-3 horas de trabalho para migração completa
