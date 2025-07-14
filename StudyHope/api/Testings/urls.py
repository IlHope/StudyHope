from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TestingViewSet

router = DefaultRouter()        # Специальный класс DRF для автоматического построения маршрутов для ViewSet'ов
router.register(r'testings', TestingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('courses/<int:course_id>/testings/', TestingViewSet.as_view({'get': 'list'}), name='course-testings'),
    # <int:course_id> — параметр, который указывает, что в URL будет передаваться целочисленное значение (ID курса)
    # TestingViewSet.as_view({'get': 'list'}) — представление, которое обрабатывает этот URL. Здесь используется метод as_view для создания представления.
    # В данном случае, когда приходит GET-запрос к этому URL, будет вызываться метод list из TestingViewSet
]
