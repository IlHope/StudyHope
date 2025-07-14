from django.db import models
from api.CustomUsers.models import CustomUser
from api.Questions.models import Question
from api.Options.models import Option

# Create your models here.


class Answer(models.Model):
    student_id = models.ManyToManyField(CustomUser, related_name='answer')
    question_id = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answer')
    option_id = models.ForeignKey(Option, on_delete=models.CASCADE, related_name='answer')

