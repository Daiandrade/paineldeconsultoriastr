# 📊 Lógica de Contagem de Agendas - Sistema SPED TR

## 🎯 Visão Geral

A **contagem de agendas** foi completamente **reformulada** para ser precisa, automática e baseada no **mês atual**.

---

## 🔄 Nova Lógica (ROBUSTA)

### **Princípios:**

1. ✅ **Contagem por Mês Atual**
   - Apenas agendas do mês/ano em curso
   - Reseta automaticamente todo mês

2. ✅ **Status Considerados**
   - **Agendada** ✓ (conta)
   - **Realizada** ✓ (conta)
   - **Cancelada** ✗ (NÃO conta)

3. ✅ **Recálculo Automático**
   - Ao carregar o dashboard
   - Ao criar agenda
   - Ao editar agenda
   - Ao excluir agenda
   - Ao trocar consultor na edição

4. ✅ **Precisão Total**
   - Não depende de incrementos/decrementos
   - Recalcula TODA a base sempre
   - Impossível ficar descalibrado

---

## 📈 Indicadores Atualizados

### **Cards do Sidebar:**

```
╔════════════════════════════╗
║ 📊 Resumo                  ║
╠════════════════════════════╣
║ Agendas Hoje          │ 2 ║
║ Agendas Este Mês      │ 8 ║
║ Consultores Ativos    │ 3 ║
║ Capacidade Restante   │45 ║
╚════════════════════════════╝
```

#### **1. Agendas Hoje**
- Agendas com data = hoje
- Status = "Agendada"
- Uso: Saber o que acontece hoje

#### **2. Agendas Este Mês** ⭐ NOVO
- Todas do mês atual
- Status = "Agendada" OU "Realizada"
- Uso: Volume total do mês

#### **3. Consultores Ativos**
- Status = "Ativo"
- Uso: Quantos consultores disponíveis

#### **4. Capacidade Restante** ⭐ NOVO
- Soma de todas agendas disponíveis (ativos)
- Menos soma de todas agendas usadas
- Uso: Quantas agendas ainda podem ser criadas

---

## 🎴 Cards dos Consultores (MELHORADOS)

### **Novo Visual:**

```
┌────────────────────────────┐
│  JC  │ Ativo               │
├────────────────────────────┤
│ Jorge Campos               │
│ 📧 jorge.campos@tr.com     │
│ 📱 (11) 98765-4321         │
│ ⭐ SPED Fiscal             │
│ 👥 Máx: 15 participantes   │
├────────────────────────────┤
│   5          │    15       │
│ Usadas       │  Restantes  │
│ este mês     │             │
├────────────────────────────┤
│ ████████░░░░░░░░░░░░       │
│      25% utilizado         │
│       (5/20)               │
├────────────────────────────┤
│  ✏️ Editar    │   🗑️      │
└────────────────────────────┘
```

### **Componentes:**

1. **Usadas este mês**
   - Total de agendas (Agendadas + Realizadas)
   - Apenas do mês atual
   - Atualiza automaticamente

2. **Restantes**
   - Disponíveis - Usadas
   - Mostra quanto ainda pode agendar

3. **Barra de Progresso** ⭐ NOVO
   - Visual da utilização
   - **Cores dinâmicas:**
     - Verde: 0-59% (tranquilo)
     - Amarelo: 60-79% (atenção)
     - Vermelho: 80-100% (crítico)

4. **Percentual + Fração**
   - `25% utilizado (5/20)`
   - Claro e preciso

---

## 🔧 Função Principal: `recalcularAgendasConsultores()`

### **Algoritmo:**

```javascript
1. Buscar todas as agendas
2. Buscar todos os consultores
3. Pegar mês/ano atual
4. RESETAR todos os contadores para ZERO
5. Para cada agenda:
   a. Verificar se é do mês/ano atual
   b. Verificar se status é válido (Agendada ou Realizada)
   c. Se SIM: incrementar contador do consultor
6. Salvar consultores atualizados
7. Recarregar display
```

### **Quando é Chamada:**

- ✅ `loadDashboardData()` - Ao abrir o sistema
- ✅ `saveAgenda()` - Ao criar/editar agenda
- ✅ `deleteAgenda()` - Ao excluir agenda

---

## 📅 Lógica de Data

### **Comparação de Mês/Ano:**

```javascript
const hoje = new Date();
const mesAtual = hoje.getMonth(); // 0-11 (Janeiro = 0)
const anoAtual = hoje.getFullYear(); // 2026

const dataAgenda = new Date(agenda.data + 'T00:00:00');
const mesAgenda = dataAgenda.getMonth();
const anoAgenda = dataAgenda.getFullYear();

// É do mês atual?
const isMesAtual = mesAgenda === mesAtual && anoAgenda === anoAtual;
```

### **Por que `+ 'T00:00:00'`?**

- Formato da agenda: `"2026-06-23"`
- `new Date("2026-06-23")` = pode dar timezone errado
- `new Date("2026-06-23T00:00:00")` = sempre correto, meia-noite local

---

## ✅ Vantagens da Nova Lógica

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Precisão** | ❌ Podia descalibrar | ✅ Sempre preciso |
| **Período** | ❌ Vitalício | ✅ Mês atual |
| **Edição** | ❌ Não ajustava | ✅ Recalcula tudo |
| **Troca Consultor** | ❌ Mantinha antigo | ✅ Atualiza ambos |
| **Status** | ❌ Só Agendada | ✅ Agendada + Realizada |
| **Canceladas** | ❌ Contavam | ✅ Não contam |
| **Manutenção** | ❌ Manual | ✅ Automática |

---

## 🎯 Casos de Uso

### **1. Início do Mês**
```
Situação: 01/Julho/2026
Sistema: Recalcula automático
Resultado: Todos consultores com "0 usadas"
```

### **2. Criar Agenda**
```
Ação: Criar agenda para 15/Jun/2026
Sistema: Verifica mês = Junho atual ✓
Sistema: Recalcula consultores
Resultado: Consultor +1 agenda usada
```

### **3. Criar Agenda Mês Passado**
```
Ação: Criar agenda para 15/Mai/2026
Sistema: Verifica mês = Maio ≠ Junho ✗
Sistema: Recalcula consultores
Resultado: Consultor mantém contagem (não conta maio)
```

### **4. Editar Agenda (Trocar Consultor)**
```
Antes: Jorge (5 usadas)
Ação: Trocar para Maria (8 usadas)
Sistema: Recalcula TODOS
Resultado:
  - Jorge: 4 usadas (recalculado)
  - Maria: 9 usadas (recalculado)
```

### **5. Cancelar Agenda**
```
Antes: Jorge (5 usadas)
Ação: Mudar status para "Cancelada"
Sistema: Recalcula consultores
Resultado: Jorge (4 usadas)
```

### **6. Excluir Agenda**
```
Antes: Jorge (5 usadas)
Ação: Excluir agenda
Sistema: Recalcula consultores
Resultado: Jorge (4 usadas)
```

---

## 📊 Métricas de Capacidade

### **Capacidade Total do Time:**

```
Consultor A: 20 disponíveis
Consultor B: 15 disponíveis
Consultor C: 18 disponíveis (Ativo)
Consultor D: 10 disponíveis (Inativo) ← NÃO CONTA

Capacidade Total = 20 + 15 + 18 = 53
```

### **Capacidade Usada:**

```
Consultor A: 5 usadas
Consultor B: 8 usadas
Consultor C: 3 usadas

Capacidade Usada = 5 + 8 + 3 = 16
```

### **Capacidade Restante:**

```
Capacidade Restante = 53 - 16 = 37
```

**Significado:** Ainda é possível criar **37 agendas** este mês com os consultores ativos.

---

## 🔍 Debugging

### **Como Verificar se Está Correto:**

1. **Abrir Console do Navegador (F12)**

2. **Executar:**
```javascript
const agendas = JSON.parse(localStorage.getItem('agendas'));
const consultores = JSON.parse(localStorage.getItem('consultores'));

// Ver agendas do mês
const hoje = new Date();
const mesAtual = hoje.getMonth();
const anoAtual = hoje.getFullYear();

const agendasMes = agendas.filter(a => {
    const d = new Date(a.data + 'T00:00:00');
    return d.getMonth() === mesAtual &&
           d.getFullYear() === anoAtual &&
           (a.status === 'Agendada' || a.status === 'Realizada');
});

console.log('Agendas deste mês:', agendasMes);
console.log('Consultores:', consultores);
```

3. **Conferir Manualmente:**
   - Contar agendas por consultor
   - Comparar com `consultor.agendasUsadas`

---

## 💡 Dicas

### **Para Gestores:**
- Monitore "Capacidade Restante" no sidebar
- Acompanhe barras de progresso (vermelho = sobrecarga)
- Planeje distribuição com antecedência

### **Para Consultores:**
- Verde = pode aceitar mais agendas tranquilamente
- Amarelo = perto do limite, avaliar prioridades
- Vermelho = capacidade máxima atingida

### **Para Administradores:**
- Use reset.html se precisar limpar dados
- Sistema recalcula automaticamente ao recarregar
- Não precisa ajuste manual nunca

---

## 🚨 Importante

### **O que NÃO fazer:**

❌ Editar `agendasUsadas` manualmente no localStorage  
❌ Confiar em valores antigos sem recarregar  
❌ Criar agendas com datas inválidas  

### **O que FAZER:**

✅ Deixar o sistema recalcular automaticamente  
✅ Usar reset.html se dados ficarem estranhos  
✅ Confiar na barra de progresso visual  
✅ Recarregar página após mudanças massivas  

---

**Versão**: 2.2.0 - Smart Counting Edition  
**Status**: ✅ 100% Preciso  
**Última atualização**: Junho 2026