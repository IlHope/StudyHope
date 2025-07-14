from rest_framework import serializers
from .models import Course
from api.Chapters.serializers import ChapterSerializer
from api.Testings.serializers import TestingSerializer


class CourseSerializer(serializers.ModelSerializer):
    # chapter и testing - используют другой сериализатор для сериализации связанных глав и тестов.
    # Аргумент many=True указывает на то, что это отношение "один ко многим" (много глав для одного курса, много тестов для одного курса).
    chapter = ChapterSerializer(many=True, read_only=True)
    testing = TestingSerializer(many=True, read_only=True)

    class Meta:
        model = Course      # Указывает модель, с которой работает этот сериализатор
        fields = ['id', 'course_name', 'course_description', 'creation_date', 'image', 'image_url', 'chapter', 'testing']
