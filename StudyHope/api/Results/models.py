from django.db import models
from api.CustomUsers.models import CustomUser
from api.Testings.models import Testing

# Create your models here.


class Result(models.Model):
    score = models.IntegerField(verbose_name='Количество првильных ответов')
    student_id = models.ManyToManyField(CustomUser, related_name='result')
    test_id = models.ForeignKey(Testing, on_delete=models.CASCADE, related_name='result')
    date_completion = models.DateTimeField(auto_now_add=True)

    # Метод задает строковое представление объекта. Используется в административной панели
    def __str__(self):
        return f"Тест ID: {self.test_id} - Счёт: {self.score}"
