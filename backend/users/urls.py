from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, login_view, logout_view, current_user, signup_view, check_user_view, verify_phone_login, save_role, check_phone_exists

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('current/', current_user, name='current_user'),
    path('check-user/', check_user_view, name='check_user'),
    path('verify-phone-login/', verify_phone_login, name='verify_phone_login'),
    path('save-role/', save_role, name='save_role'),
    path('check-phone/', check_phone_exists, name='check_phone_exists'),
]
