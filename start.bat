@echo off
title LuxeHome - Dev Server
color 0A

echo.
echo  ==========================================
echo    LuxeHome - Premium Furniture Website
echo  ==========================================
echo.
echo  [1/2] Installing dependencies...
echo.

call npm install

echo.
echo  [2/2] Starting dev server...
echo.
echo  ==========================================
echo    Open: http://localhost:5173
echo  ==========================================
echo.

call npm run dev

pause
