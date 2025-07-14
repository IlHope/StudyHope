from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet

router = DefaultRouter()        # Специальный класс DRF для автоматического построения маршрутов для ViewSet'ов
router.register(r'questions', QuestionViewSet)

urlpatterns = router.urls
