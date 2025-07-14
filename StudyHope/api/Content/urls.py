from rest_framework.routers import DefaultRouter
from .views import ContentViewSet

router = DefaultRouter()        # Специальный класс DRF для автоматического построения маршрутов для ViewSet'ов
router.register(r'content', ContentViewSet)

urlpatterns = router.urls
