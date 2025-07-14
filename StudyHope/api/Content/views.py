from django.shortcuts import render
from rest_framework import viewsets
from .models import Content
from .serializers import ContentSerializer

# Create your views here.


class ContentViewSet(viewsets.ModelViewSet):        # ModelViewSet предоставляет реализацию стандартных действий CRUD (Create, Retrieve, Update, Delete)
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
