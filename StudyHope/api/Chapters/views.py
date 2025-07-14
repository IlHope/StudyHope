from django.shortcuts import render
from rest_framework import viewsets
from .models import Chapter
from .serializers import ChapterSerializer

# Create your views here.


class ChapterViewSet(viewsets.ModelViewSet):        # ModelViewSet предоставляет реализацию стандартных действий CRUD (Create, Retrieve, Update, Delete)
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
