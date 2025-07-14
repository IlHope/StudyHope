from rest_framework.routers import DefaultRouter
from .views import ChapterViewSet

router = DefaultRouter()        # Специальный класс DRF для автоматического построения маршрутов для ViewSet'ов
router.register(r'chapters', ChapterViewSet)

urlpatterns = router.urls
