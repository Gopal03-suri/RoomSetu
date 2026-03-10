@echo off
echo ========================================
echo Starting RoomSetu Application
echo ========================================
echo.

echo Starting Django Backend Server...
start cmd /k "cd backend && venv\Scripts\activate && python manage.py runserver"

timeout /t 3 /nobreak > nul

echo Starting React Frontend Server...
start cmd /k "cd roomsetu && npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul
