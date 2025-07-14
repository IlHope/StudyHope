from django.db import models
from api.Testings.models import Testing

# Create your models here.


class Question(models.Model):
    # Это кортеж кортежей. Каждый внутренний кортеж представляет собой выбор для поля question_type. Первый элемент внутренних кортежей — это значение, которое будет храниться в базе данных, а второй — человекочитаемая метка для администратора
    TYPE_CHOICES = (
        ('MC', 'Multiple Choice'),
        ('OE', 'Open Ended')
    )
    question_text = models.TextField(max_length=150, blank=False, verbose_name='Название (описание) вопроса')
    question_type = models.CharField(max_length=2, choices=TYPE_CHOICES, default='MC')                          # choices=TYPECHOICES - определяет ограниченный набор значений для этого поля. Выбор предоставляется из кортежа TYPE_CHOICES
    test_id = models.ForeignKey(Testing, on_delete=models.CASCADE, related_name='question')

    # Метод задает строковое представление объекта. Используется в административной панели
    def __str__(self):
        return self.question_text
    