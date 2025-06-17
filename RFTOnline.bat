@echo off
:: Variáveis
set TOKEN=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

:: Atualiza do repositório remoto usando o token
git fetch https://%TOKEN%@github.com/lucasuix/refty-v2.git
git pull https://%TOKEN%@github.com/lucasuix/refty-v2.git main

:: Inicia o app (sem console)
start "" pythonw app.py
pause
