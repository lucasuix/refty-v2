@echo off
:: Variáveis
set TOKEN=decoy_token
set REPO=https://%TOKEN%@github.com/lucasuix/refty-v2.git

:: Atualiza do repositório remoto usando o token
git fetch %REPO%
git pull %REPO% main

:: Inicia o app (sem console)
start "" pythonw app.py
exit
