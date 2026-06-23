# 📅 Guia da Timeline - Sistema SPED TR

## 🎯 Visão Geral

A **Timeline** é uma visualização **ROBUSTA** e **PROFISSIONAL** dos itens do roadmap, organizada cronologicamente e por status, com recursos visuais avançados.

---

## 📍 Onde Encontrar

### 1️⃣ **Na Agenda (Modal)**
- Abrir/Editar agenda
- Ir na aba **"🗺️ Roadmap"**
- Clicar no botão **"📅 Linha do Tempo"**

### 2️⃣ **Na Seção Roadmap Principal**
- Menu lateral: clicar em **"🗺️ Roadmap"**
- No topo, clicar no botão **"📅 Timeline"**

---

## ✨ Funcionalidades da Timeline

### 🎨 **Visual Robusto**

#### **Contador Principal**
```
╔══════════════════════════════════════╗
║         🔵  7 itens                 ║
║    selecionados para esta agenda     ║
║  💡 Clique nos itens para selecionar ║
╚══════════════════════════════════════╝
```

#### **Cards de Estatísticas** (Roadmap Principal)
```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│    7     │  │    3     │  │    2     │  │    4     │
│  Total   │  │ Desenv.  │  │Concluído │  │ Receita  │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### 📊 **Organização por Status**

#### **3 Seções Principais:**

1. **⚙️ Em Desenvolvimento** (Amarelo)
   - Itens em progresso ativo
   - Ordenados por: Data de previsão → Prioridade

2. **📋 Planejado** (Azul)
   - Itens aguardando início
   - Ordenados por: Data de previsão → Prioridade

3. **✅ Concluído** (Verde)
   - Itens finalizados
   - Exibidos para referência histórica

Cada seção mostra:
- Ícone colorido grande
- Nome do status
- Contador de itens
- Contador de selecionados (na agenda)

### 🎴 **Cards dos Itens**

Cada item exibe:

**📌 Cabeçalho:**
- Título do item
- Badge do produto (com cor e iniciais)
- Ícone de seleção ✓ (quando selecionado)

**📝 Corpo:**
- Descrição completa
- Badges: Status, Prioridade
- Badge especial: ⚠️ Depende Receita
- Badge: 🔗 Tem Dependências

**📅 Rodapé:**
- Previsão de entrega (se cadastrado)
- Detalhes das dependências

### 🎯 **Linha do Tempo Vertical**

```
   │
   ●─── Item 1 (Crítica - 30/Jul)
   │
   ●─── Item 2 (Alta - 15/Ago)
   │
   ●─── Item 3 (Média - 30/Set)
   │
   ●
```

- Linha vertical conectando os itens
- Bolinhas marcadoras
- **Animação de pulsação** nos itens selecionados
- **Hover com deslocamento** para destaque

---

## 🎮 Interatividade

### **Na Agenda (Modal):**

1. **Selecionar Item:**
   - Clicar no card do item
   - Aparece ✓ verde
   - Contador atualiza automaticamente
   - Animação de pulsação ativa

2. **Desselecionar Item:**
   - Clicar novamente no card
   - ✓ desaparece
   - Contador atualiza

3. **Alternar Visualizações:**
   - **📊 Por Produto**: Kanban com colunas
   - **📅 Linha do Tempo**: Timeline vertical

### **No Roadmap Principal:**

1. **Visualizar Timeline:**
   - Clicar em "📅 Timeline"
   - Ver estatísticas gerais
   - Navegar por status

2. **Editar/Excluir:**
   - Botões ✏️ e 🗑️ em cada item
   - Ações diretas sem modal adicional

---

## 🎨 Design e Cores

### **Códigos de Cores por Status:**

| Status | Cor | Gradiente |
|--------|-----|-----------|
| 📋 Planejado | Azul | `#DBEAFE → #BFDBFE` |
| ⚙️ Em Desenvolvimento | Amarelo | `#FEF3C7 → #FDE68A` |
| ✅ Concluído | Verde | `#D1FAE5 → #A7F3D0` |
| ❌ Cancelado | Vermelho | `#FEE2E2 → #FECACA` |

### **Badges:**

- **Prioridade Crítica/Alta**: Vermelho
- **Prioridade Média**: Amarelo
- **Prioridade Baixa**: Cinza
- **Depende Receita**: Vermelho com ⚠️
- **Tem Dependências**: Azul com 🔗
- **Produto**: Cor personalizada do produto

---

## 📱 Responsividade

### **Desktop (>768px):**
- Timeline completa com linha lateral
- Cards lado a lado quando houver espaço
- Hover com deslocamento horizontal

### **Tablet (768px):**
- Timeline com espaçamento reduzido
- Cards empilhados
- Linha lateral mais fina

### **Mobile (<768px):**
- Botões de visualização empilhados
- Timeline sem linha lateral
- Cards 100% largura
- Check ✓ abaixo do título

---

## 🚀 Casos de Uso

### **1. Planejamento de Agenda**
```
Objetivo: Criar agenda focada em itens críticos

1. Criar nova agenda
2. Ir na aba Roadmap
3. Clicar em "📅 Linha do Tempo"
4. Filtrar por "Em Desenvolvimento"
5. Selecionar itens com Prioridade Crítica
6. Revisar previsões de entrega
7. Salvar agenda
```

### **2. Visão Geral do Roadmap**
```
Objetivo: Apresentar status geral para stakeholders

1. Ir em "Roadmap"
2. Clicar em "📅 Timeline"
3. Ver estatísticas no topo:
   - Total de itens
   - Em desenvolvimento
   - Concluídos
   - Dependentes da Receita
4. Navegar pelas seções
5. Identificar gargalos
```

### **3. Priorização por Data**
```
Objetivo: Focar em itens com entrega próxima

1. Abrir Timeline
2. Verificar seção "Em Desenvolvimento"
3. Itens já ordenados por data
4. Primeiro da lista = mais urgente
5. Selecionar para agenda
```

### **4. Tracking de Dependências**
```
Objetivo: Identificar bloqueios

1. Ver badges "⚠️ Depende Receita"
2. Ver badges "🔗 Tem Dependências"
3. Expandir descrição
4. Ler detalhes das dependências
5. Planejar ações
```

---

## 🎯 Diferenciais

✅ **Ordenação Inteligente** - Por data + prioridade  
✅ **3 Níveis de Status** - Desenvolvimento, Planejado, Concluído  
✅ **Visual Profissional** - Gradientes, sombras, animações  
✅ **Linha do Tempo Real** - Conexão visual entre itens  
✅ **Estatísticas em Tempo Real** - Cards dinâmicos  
✅ **Badges Informativos** - Prioridade, dependências, produto  
✅ **Datas Visíveis** - Previsões destacadas  
✅ **Hover Interativo** - Deslocamento + sombra  
✅ **Seleção Visual** - Pulsação + check animado  
✅ **Totalmente Responsivo** - Desktop, tablet, mobile  

---

## 💡 Dicas de Uso

### **Para Consultores:**
- Use a Timeline para visualizar cronologicamente
- Priorize itens com data próxima
- Identifique dependências da Receita
- Agrupe itens do mesmo produto

### **Para Gestores:**
- Use estatísticas para reports
- Acompanhe "Em Desenvolvimento"
- Identifique gargalos por produto
- Monitore dependências bloqueantes

### **Para Clientes:**
- Visualização clara de status
- Previsões de entrega visíveis
- Entendimento de dependências
- Acompanhamento por produto

---

## 🔄 Sincronização

A Timeline sincroniza automaticamente com:
- ✅ Cadastro de novos itens
- ✅ Alteração de status
- ✅ Atualização de datas
- ✅ Mudança de prioridade
- ✅ Seleção de itens na agenda
- ✅ Edição/exclusão de itens

Toda alteração reflete **instantaneamente** em todas as visualizações!

---

## 📊 Métricas Visuais

A Timeline exibe automaticamente:

1. **Total de Itens Selecionados** (Agenda)
2. **Total Geral de Itens** (Roadmap)
3. **Itens em Desenvolvimento**
4. **Itens Concluídos**
5. **Itens Dependentes da Receita**
6. **Contadores por Seção**
7. **Contadores por Produto** (Kanban)

---

**Versão**: 2.1.0 - Timeline Edition  
**Status**: ✅ 100% Operacional  
**Última atualização**: Junho 2026