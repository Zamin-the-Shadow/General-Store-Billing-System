@echo off
echo ==========================================
echo   GitHub Force Upload Script
echo   Repo: Zamin-the-Shadow/General-Store-Billing-System
echo ==========================================
echo.

:: Step 1 - Install Git LFS
echo [1/7] Setting up Git LFS...
git lfs install
echo Done!
echo.

:: Step 2 - Find and track large files (over 90MB)
echo [2/7] Tracking large files with Git LFS...
for /f "delims=" %%F in ('git ls-files -z ^| xargs -0 ls -s 2^>nul ^| sort -rn ^| awk "$1 > 90000 {print $2}"') do (
    echo Tracking: %%F
    git lfs track "%%F"
)
echo Done!
echo.

:: Step 3 - Common large file types (safety net)
echo [3/7] Tracking common large file types...
git lfs track "*.db"
git lfs track "*.sqlite"
git lfs track "*.zip"
git lfs track "*.rar"
git lfs track "*.exe"
git lfs track "*.dll"
git lfs track "*.mp4"
git lfs track "*.avi"
git lfs track "*.mkv"
git lfs track "*.pdf"
git lfs track "*.psd"
git lfs track "*.iso"
git lfs track "*.bin"
git lfs track "*.bak"
echo Done!
echo.

:: Step 4 - Add .gitattributes
echo [4/7] Saving LFS settings...
git add .gitattributes
echo Done!
echo.

:: Step 5 - Set remote origin
echo [5/7] Setting GitHub repository...
git remote remove origin 2>nul
git remote add origin https://github.com/Zamin-the-Shadow/General-Store-Billing-System.git
echo Done!
echo.

:: Step 6 - Add all files
echo [6/7] Adding all project files...
git add .
git commit -m "Upload full project with Git LFS support"
echo Done!
echo.

:: Step 7 - Force push to GitHub
echo [7/7] Uploading to GitHub...
git push -u origin main --force
echo.

echo ==========================================
echo   Upload Complete! Check your GitHub repo.
echo   https://github.com/Zamin-the-Shadow/General-Store-Billing-System
echo ==========================================
pause
