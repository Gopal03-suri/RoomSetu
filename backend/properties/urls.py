from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, RoommateViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'roommates', RoommateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
