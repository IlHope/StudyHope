from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions

from .models import Course
from .serializers import CourseSerializer

# Create your views here.


class CourseViewSet(viewsets.ModelViewSet):                                                     # ModelViewSet предоставляет реализацию стандартных действий CRUD (Create, Retrieve, Update, Delete)
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    # @action - декоратор
    # detail=True указывает, что действие применяется к конкретному объекту (курсу), а не ко всему набору данных
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def add_to_user(self, request, pk=None):
        course = self.get_object()                                                              # Получает текущий объект курса на основе переданного идентификатора pk
        user = request.user                                                                     # Получает текущего аутентифицированного пользователя
        user.course_id.add(course)                                                              # Добавляет курс к списку курсов пользователя
        return Response({'status': 'course added'})                                             # Возвращает ответ с сообщением о том, что курс был добавлен

    @action(detail=True, methods=['delete'], permission_classes=[permissions.IsAuthenticated])
    def remove_from_user(self, request, pk=None):
        course = self.get_object()                                                              # Получает текущий объект курса на основе переданного идентификатора pk
        user = request.user                                                                     # Получает текущего аутентифицированного пользователя
        user.course_id.remove(course)                                                           # Удаляет курс из списка курсов пользователя
        return Response({'status': 'course removed'})                                           # Возвращает ответ с сообщением о том, что курс был удален
