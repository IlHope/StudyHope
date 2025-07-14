from django.urls import path
from .views import submit_answers

urlpatterns = [
    path('submit_answers/', submit_answers, name='submit_answers'),
]
