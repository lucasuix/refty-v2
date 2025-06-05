@echo off
git fetch
git pull origin master
start "" pythonw app.py
exit