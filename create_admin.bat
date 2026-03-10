@echo off
echo Creating Django Superuser...
echo.
cd backend
python manage.py createsuperuser
pause
