@echo off
echo Installing Firebase for Social Authentication...
echo.
cd roomsetu
npm install firebase
echo.
echo Firebase installed successfully!
echo.
echo Next steps:
echo 1. Go to https://console.firebase.google.com/
echo 2. Create/select your project
echo 3. Get your Firebase config
echo 4. Update roomsetu/src/firebaseConfig.js with your credentials
echo.
pause
