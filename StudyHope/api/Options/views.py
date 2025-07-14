from django.shortcuts import render
from rest_framework import viewsets
from .models import Option
from .serializers import OptionSerializer

# Create your views here.


class OptionViewSet(viewsets.ModelViewSet):     # ModelViewSet предоставляет реализацию стандартных действий CRUD (Create, Retrieve, Update, Delete)
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
