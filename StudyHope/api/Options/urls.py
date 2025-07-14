from rest_framework.routers import DefaultRouter
from .views import OptionViewSet

router = DefaultRouter()        # Специальный класс DRF для автоматического построения маршрутов для ViewSet'ов
router.register(r'options', OptionViewSet)

urlpatterns = router.urls
