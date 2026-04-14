@echo off
title LuxeHome - Push to GitHub
color 0B

echo.
echo  ==========================================
echo    LuxeHome - GitHub Push Script
echo  ==========================================
echo.

REM === Step 1: Init git if not already done ===
if not exist ".git" (
    echo  [1/5] Initializing git repository...
    git init
) else (
    echo  [1/5] Git already initialized. Skipping...
)

REM === Step 2: Stage all files ===
echo.
echo  [2/5] Staging all files...
git add .

REM === Step 3: Commit ===
echo.
echo  [3/5] Committing changes...
git commit -m "✨ LuxeHome: Premium home appliances and furniture website"

REM === Step 4: Ask for GitHub username ===
echo.
echo  [4/5] GitHub Setup
echo  -----------------------------------------
set /p USERNAME="  Enter your GitHub username: "

REM === Step 5: Create remote and push ===
echo.
echo  [5/5] Pushing to GitHub...
echo.

REM Remove old origin if exists
git remote remove origin 2>nul

git remote add origin https://github.com/%USERNAME%/luxehome.git
git branch -M main
git push -u origin main

echo.
echo  ==========================================
echo   SUCCESS! Visit your repo at:
echo   https://github.com/%USERNAME%/luxehome
echo  ==========================================
echo.
pause
