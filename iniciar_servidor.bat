@echo off
echo ========================================
echo    INICIANDO SERVIDOR AFORIX
echo ========================================
echo.

cd /d "%~dp0"

echo Activando entorno virtual...
call ..\venv\Scripts\activate.bat

echo.
echo Verificando configuracion de Django...
python manage.py check

echo.
echo Iniciando servidor de desarrollo...
echo.
echo El servidor estara disponible en:
echo   http://127.0.0.1:8000/
echo   http://localhost:8000/
echo.
echo Presiona CTRL+C para detener el servidor
echo.

python manage.py runserver

pause

