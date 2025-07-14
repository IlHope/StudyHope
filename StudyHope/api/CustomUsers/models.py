from django.db import models
from django.contrib.auth.models import AbstractUser
from api.Courses.models import Course

# Create your models here.


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=150, blank=False, verbose_name='Имя')
    last_name = models.CharField(max_length=150, blank=False, verbose_name='Фамилия')
    educational_subject = models.CharField(max_length=150, blank=True, verbose_name='Образовательный предмет')
    is_teacher = models.BooleanField(default=False, verbose_name='Статус преподавателя',
                                     help_text='Отметьте, если пользователь является преподавателем')
    course_id = models.ManyToManyField(Course, related_name='user')

    # Метод задает строковое представление объекта. Используется в административной панели
    def __str__(self):
        return self.username


