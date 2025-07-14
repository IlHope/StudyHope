from rest_framework.routers import DefaultRouter
from .views import ResultViewSet

router = DefaultRouter()        # Специальный класс DRF для автоматического построения маршрутов для ViewSet'ов
router.register(r'results', ResultViewSet)

urlpatterns = router.urls
