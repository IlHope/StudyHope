from django.db import models
from api.Questions.models import Question

# Create your models here.


class Option(models.Model):
    option_text = models.TextField(max_length=150, blank=False, verbose_name='Вариант ответа')
    isCorrect = models.BooleanField(default=False, blank=False, verbose_name='Правильный/Неправильный ответ')
    question_id = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='option')

    # Метод задает строковое представление объекта. Используется в административной панели
    def __str__(self):
        return self.option_text
