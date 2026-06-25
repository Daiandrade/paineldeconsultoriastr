# 🏢 Deploy Local na Rede TR

## 🎯 Solução para Rede Corporativa

Se plataformas cloud estão bloqueadas, você pode:

---

## ✅ OPÇÃO 1: Compartilhar na Rede Local

### 1. Descobrir seu IP local

```powershell
ipconfig | Select-String "IPv4"
```

### 2. Iniciar servidor

```bash
npm start
```

### 3. Compartilhar URL

Sua equipe pode acessar via:
```
http://SEU-IP:3000
```

Exemplo: `http://10.123.45.67:3000`

**Importante:** Funciona apenas na mesma rede (VPN TR)

---

## ✅ OPÇÃO 2: Pedir Ambiente Interno

### Pergunte ao seu gestor/IT:

1. **Existe servidor interno para Node.js?**
   - Azure interno TR
   - Servidor de aplicações
   - VM dedicada

2. **Como fazer deploy de apps internos?**
   - Processo interno
   - Ferramentas aprovadas
   - Documentação

3. **Alternativas aprovadas?**
   - Heroku (pode estar liberado)
   - Azure TR
   - AWS TR

---

## ✅ OPÇÃO 3: Solicitar Liberação

### Via Global Service Desk:

**Teams Chat:**
```
chat@trservicedesk.com
```

**Telefone:**
```
AMERS: +1 833 516 9378
```

**Solicitar acesso a:**
- render.com
- railway.app
- vercel.com (alternativa)

**Justificativa:**
```
Desenvolvimento de aplicação interna de gestão
de consultorias SPED. Necessário para deploy
de aplicação Node.js.
```

---

## ✅ OPÇÃO 4: Deploy no Azure TR (Se disponível)

Se a TR usa Azure internamente:

### 1. Azure App Service

```bash
# Via Azure CLI
az webapp up --name painel-consultorias-tr --runtime "NODE|18-lts"
```

### 2. Azure Container

```bash
# Via Docker
docker build -t painel-consultorias .
az acr build --registry trregistry --image painel-consultorias .
```

---

## 🔧 CONTINUAR DESENVOLVENDO LOCAL

Por enquanto, o sistema funciona perfeitamente local:

```bash
npm start
```

**Acesse:**
```
http://localhost:3000
```

**Para equipe na mesma rede:**
```
http://[seu-ip]:3000
```

---

## 💡 RECOMENDAÇÃO:

1. **Agora:** Use localmente
2. **Curto prazo:** Solicite liberação ao IT
3. **Médio prazo:** Deploy em ambiente TR interno
4. **Longo prazo:** Servidor dedicado para aplicações SPED

---

## 📞 CONTATOS IT TR:

**Global Service Desk:**
- Teams: chat@trservicedesk.com
- AMERS: +1 833 516 9378
- EMEA: +44 8000 163869
- APAC: +65 3157 4653

**Processo:**
https://portal.tr.com (buscar "Zscaler access request")

---

## ✅ O QUE VOCÊ TEM AGORA:

- ✅ Sistema 100% funcional
- ✅ Backend completo
- ✅ Banco configurado
- ✅ Rodando localmente
- ✅ Pronto para deploy quando houver acesso

**O sistema está pronto, só falta o ambiente de deploy aprovado!**
