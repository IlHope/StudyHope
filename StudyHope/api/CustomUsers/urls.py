from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet

router = DefaultRouter()        # Специальный класс DRF для автоматического построения маршрутов для ViewSet'ов
router.register(r'users', CustomUserViewSet, basename='customuser')

urlpatterns = [
    path('', include(router.urls)),
]