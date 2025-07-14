from django.db import models
from api.Chapters.models import Chapter

# Create your models here.


class Content(models.Model):
    content_text = models.TextField(max_length=15000, blank=True, verbose_name='Содержание главы')
    chapter_id = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='content')

    # Метод задает строковое представление объекта. Используется в административной панели
    def __str__(self):
        return str(self.chapter_id)

