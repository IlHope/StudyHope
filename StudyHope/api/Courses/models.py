from django.db import models

# Create your models here.


class Course(models.Model):
    course_name = models.CharField(max_length=150, blank=True, verbose_name='Курсы')
    course_description = models.TextField(max_length=1500, blank=True, verbose_name='Описание курса')
    creation_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='courses_images/')                                                  # Определяет директорию (относительно `MEDIA_ROOT`), куда будут загружаться изображения.

    # Метод задает строковое представление объекта. Используется в административной панели
    def __str__(self):
        return self.course_name

    # Декоратор, который позволяет обращаться к методу как к атрибуту
    @property
    def image_url(self):
        return self.image.url                                                                               #  Возвращает URL для доступа к изображению, хранящемуся в поле `image`

