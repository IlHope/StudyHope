from django.db import models
from api.Courses.models import Course

# Create your models here.


class Chapter(models.Model):
    chapter_name = models.CharField(max_length=150, blank=True, verbose_name='Название главы')
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='chapter')

    # Метод задает строковое представление объекта. Используется в административной панели
    def __str__(self):
        return self.chapter_name
