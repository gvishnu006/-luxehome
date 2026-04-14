@echo off
title LuxeHome - Full Setup & GitHub Push
color 0A
cls

echo.
echo  =====================================================
echo     LuxeHome - Premium Home Furniture Website
echo     Full Setup and GitHub Push Script
echo  =====================================================
echo.
echo  This script will:
echo    1. Install npm packages
echo    2. Initialize git repository
echo    3. Commit all project files
echo    4. Push to your GitHub account
echo.
echo  =====================================================
echo.

REM -------------------------------------------------------
REM STEP 1 — npm install
REM -------------------------------------------------------
echo  [STEP 1/6]  Installing npm packages...
echo  -----------------------------------------------------
call npm install
if %errorlevel% neq 0 (
    echo.
    echo  ERROR: npm install failed. Make sure Node.js is installed.
    echo  Download Node.js from: https://nodejs.org
    pause
    exit /b 1
)
echo  npm packages installed successfully!
echo.

REM -------------------------------------------------------
REM STEP 2 — git init
REM -------------------------------------------------------
echo  [STEP 2/6]  Initializing git...
echo  -----------------------------------------------------
if not exist ".git" (
    git init
    echo  Git initialized.
) else (
    echo  Git already initialized. Skipping.
)
echo.

REM -------------------------------------------------------
REM STEP 3 — git add
REM -------------------------------------------------------
echo  [STEP 3/6]  Staging all files...
echo  -----------------------------------------------------
git add .
echo  All files staged.
echo.

REM -------------------------------------------------------
REM STEP 4 — git commit
REM -------------------------------------------------------
echo  [STEP 4/6]  Committing files...
echo  -----------------------------------------------------
git commit -m "feat: LuxeHome premium home appliances and furniture website with animated UI/UX"
echo.

REM -------------------------------------------------------
REM STEP 5 — GitHub Username
REM -------------------------------------------------------
echo  [STEP 5/6]  GitHub Configuration
echo  -----------------------------------------------------
echo.
echo  BEFORE continuing, make sure you have:
echo    - Created a GitHub account at https://github.com
echo    - Created a NEW empty repo named: luxehome
echo      (no README, no .gitignore, no license)
echo.
set /p GH_USER="  Enter your GitHub username: "
echo.

REM -------------------------------------------------------
REM STEP 6 — Push to GitHub
REM -------------------------------------------------------
echo  [STEP 6/6]  Pushing to GitHub...
echo  -----------------------------------------------------

git remote remove origin 2>nul
git remote add origin https://github.com/%GH_USER%/luxehome.git
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo  =====================================================
    echo   PUSH FAILED - Try the following:
    echo  =====================================================
    echo.
    echo   Option A: Use GitHub CLI
    echo     - Install from: https://cli.github.com
    echo     - Run: gh auth login
    echo     - Then: gh repo create luxehome --public --push --source=.
    echo.
    echo   Option B: Use Personal Access Token
    echo     - Go to GitHub Settings > Developer Settings > Tokens
    echo     - Create a token with 'repo' scope
    echo     - Use token as password when prompted
    echo.
    pause
    exit /b 1
)

echo.
echo  =====================================================
echo   SUCCESS! Your site is live on GitHub!
echo  =====================================================
echo.
echo   Repository:  https://github.com/%GH_USER%/luxehome
echo.
echo  =====================================================
echo   To deploy on Vercel (free hosting):
echo  =====================================================
echo.
echo   1. Go to https://vercel.com
echo   2. Click "Add New Project"
echo   3. Import: github.com/%GH_USER%/luxehome
echo   4. Build Command:   npm run build
echo   5. Output Dir:      dist
echo   6. Click Deploy!
echo.
echo  =====================================================
echo.

REM -------------------------------------------------------
REM BONUS — Start dev server
REM -------------------------------------------------------
set /p START_DEV="  Start local dev server now? (y/n): "
if /i "%START_DEV%"=="y" (
    echo.
    echo  Starting dev server at http://localhost:5173 ...
    start http://localhost:5173
    npm run dev
)

pause
