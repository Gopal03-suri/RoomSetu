@echo off
echo Testing RoomSetu Signup API...
echo.

curl -X POST http://127.0.0.1:8000/api/auth/signup/ ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser123\",\"email\":\"testuser123@example.com\",\"password\":\"test123\",\"first_name\":\"Test\",\"last_name\":\"User\",\"role\":\"tenant\",\"city\":\"Mumbai\",\"phone\":\"\"}"

echo.
echo.
echo If you see user data above, signup is working!
echo If you see an error, check if backend is running.
pause
