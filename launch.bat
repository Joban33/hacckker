@echo off
title HacckeerJATT — Dev Server
color 0A

echo.
echo  ██╗  ██╗ █████╗  ██████╗ ██████╗██╗  ██╗███████╗███████╗██████╗
echo  ██║  ██║██╔══██╗██╔════╝██╔════╝██║ ██╔╝██╔════╝██╔════╝██╔══██╗
echo  ███████║███████║██║     ██║     █████╔╝ █████╗  █████╗  ██████╔╝
echo  ██╔══██║██╔══██║██║     ██║     ██╔═██╗ ██╔══╝  ██╔══╝  ██╔══██╗
echo  ██║  ██║██║  ██║╚██████╗╚██████╗██║  ██╗███████╗███████╗██║  ██║
echo  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
echo.
echo  [ JATT ] Hover Mask Reveal — Cinematic Hacker Portrait
echo  --------------------------------------------------------
echo.

cd /d "%~dp0"

echo  [*] Starting dev server...
echo  [*] Opening browser at http://localhost:5173
echo.

:: Open browser after a short delay
start "" timeout /t 2 >nul
start "" "http://localhost:5173"

:: Start the dev server
npm run dev

pause
