@echo off
:: Variáveis
set TOKEN=meu_token_read_only
set REPO=https://%TOKEN%@github.com/lucasuix/refty-v2.git

:: Atualiza do repositório remoto usando o token
git fetch %REPO%
git pull %REPO% main

:: Inicia o app (sem console)
start "" pythonw app.py
exit
