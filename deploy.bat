@echo off
echo ========================================
echo   Sistema SPED TR - Deploy Automatico
echo ========================================
echo.

REM Verificar se git esta instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Git nao encontrado!
    echo Instale o Git: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/5] Verificando status do Git...
git status

echo.
echo [2/5] Adicionando arquivos...
git add .

echo.
echo [3/5] Criando commit...
set /p mensagem="Digite a mensagem do commit (ou Enter para padrao): "
if "%mensagem%"=="" set mensagem=Atualizacao do sistema
git commit -m "%mensagem%"

echo.
echo [4/5] Enviando para repositorio...
git push origin main

echo.
echo [5/5] Deploy concluido!
echo.
echo ========================================
echo   Sistema atualizado com sucesso!
echo ========================================
echo.
echo Aguarde 2-5 minutos para o deploy ser processado
echo pela plataforma (GitHub Pages, Netlify, etc)
echo.
pause