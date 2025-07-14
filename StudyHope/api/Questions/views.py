from django.shortcuts import render
from rest_framework import viewsets
from .models import Question
from .serializers import QuestionSerializer

# Create your views here.


class QuestionViewSet(viewsets.ModelViewSet):       # ModelViewSet предоставляет реализацию стандартных действий CRUD (Create, Retrieve, Update, Delete)
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
