from rest_framework import serializers
from .models import Testing
from api.Questions.serializers import QuestionSerializer


class TestingSerializer(serializers.ModelSerializer):
    # question - использует другой сериализатор QuestionSerializer для сериализации связанных вопросов.
    # Аргумент many=True указывает на то, что это отношение "один ко многим" (много вопросов для одного теста).
    # Аргумент read_only=True делает это поле доступным только для чтения, то есть его нельзя будет изменять через этот сериализатор.
    question = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Testing     # Указывает модель, с которой работает этот сериализатор
        fields = ['id', 'testing_name', 'question']
