@echo off
title GymForge - Localhost Server
echo ========================================================
echo         Starting GymForge on Localhost...
echo ========================================================
echo.
echo Installing dependencies if missing...
call npm install
echo.
echo Starting Express Server...
echo Open your browser and go to: http://localhost:3000
echo.
call npm start
pause
