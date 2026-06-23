#!/bin/bash

echo "========================================"
echo "  Sistema SPED TR - Deploy Automático"
echo "========================================"
echo ""

# Verificar se git está instalado
if ! command -v git &> /dev/null; then
    echo "ERRO: Git não encontrado!"
    echo "Instale o Git: https://git-scm.com/"
    exit 1
fi

echo "[1/5] Verificando status do Git..."
git status

echo ""
echo "[2/5] Adicionando arquivos..."
git add .

echo ""
echo "[3/5] Criando commit..."
read -p "Digite a mensagem do commit (ou Enter para padrão): " mensagem
if [ -z "$mensagem" ]; then
    mensagem="Atualização do sistema"
fi
git commit -m "$mensagem"

echo ""
echo "[4/5] Enviando para repositório..."
git push origin main

echo ""
echo "[5/5] Deploy concluído!"
echo ""
echo "========================================"
echo "  Sistema atualizado com sucesso!"
echo "========================================"
echo ""
echo "Aguarde 2-5 minutos para o deploy ser processado"
echo "pela plataforma (GitHub Pages, Netlify, etc)"
echo ""