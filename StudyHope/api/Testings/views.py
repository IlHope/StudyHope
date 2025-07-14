from django.shortcuts import render
from rest_framework import viewsets
from .models import Testing
from .serializers import TestingSerializer

# Create your views here.


class TestingViewSet(viewsets.ReadOnlyModelViewSet):            # ReadOnlyModelViewSet предоставляет методы list и retrieve
    queryset = Testing.objects.all()
    serializer_class = TestingSerializer

    def get_queryset(self):                                     # Метод переопределяет стандартный queryset. Он получает course_id из параметров URL и возвращает только те объекты, которые связаны с данным course_id
        course_id = self.kwargs['course_id']                    # self.kwargs — это словарь, содержащий все именованные параметры, извлеченные из текущего URL
        return Testing.objects.filter(course_id=course_id)      # Запрос к базе данных, который выбирает все объекты модели Testing, у которых поле course_id равно значению course_id, полученному из URL
