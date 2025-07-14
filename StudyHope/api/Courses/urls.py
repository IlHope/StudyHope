from rest_framework.routers import DefaultRouter
from .views import CourseViewSet

router = DefaultRouter()        # Специальный класс DRF для автоматического построения маршрутов для ViewSet'ов
router.register(r'courses', CourseViewSet)

urlpatterns = router.urls
