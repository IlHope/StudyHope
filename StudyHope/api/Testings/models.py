from django.db import models
from api.Courses.models import Course
# Create your models here.


class Testing(models.Model):
    testing_name = models.CharField(max_length=150, blank=False, verbose_name='Имя теста')
    creation_date = models.DateTimeField(auto_now_add=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='testing')

    # Метод задает строковое представление объекта. Используется в административной панели
    def __str__(self):
        return self.testing_name
