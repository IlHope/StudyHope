from rest_framework import serializers
from .models import Chapter
from api.Content.serializers import ContentSerializer


class ChapterSerializer(serializers.ModelSerializer):
    # content - использует другой сериализатор для сериализации связанных содержаний.
    # Аргумент many=True указывает на то, что это отношение "один ко многим" (много содержаний для одной главы).
    content = ContentSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter                                         # Указывает модель, с которой работает этот сериализатор
        fields = ['id', 'chapter_name', 'content']
