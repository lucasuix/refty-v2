@echo off
:: Variáveis
set TOKEN=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
set REPO=https://%TOKEN%@github.com/lucasuix/refty-v2.git

:: Atualiza do repositório remoto usando o token
git fetch %REPO%
git pull %REPO% main

:: Inicia o app (sem console)
start "" pythonw app.py
exit
