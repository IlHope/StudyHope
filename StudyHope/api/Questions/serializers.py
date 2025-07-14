from rest_framework import serializers
from .models import Question
from api.Options.serializers import OptionSerializer


class QuestionSerializer(serializers.ModelSerializer):
    # option - использует другой сериализатор OptionSerializer для сериализации связанных вариантов ответа.
    # Аргумент many=True указывает на то, что это отношение "один ко многим" (много ответов для одного вопроса).
    # Аргумент read_only=True делает это поле доступным только для чтения, то есть его нельзя будет изменять через этот сериализатор.
    option = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question                                                        # Указывает модель, с которой работает этот сериализатор
        fields = ['id', 'question_text', 'question_type', 'test_id', 'option']
