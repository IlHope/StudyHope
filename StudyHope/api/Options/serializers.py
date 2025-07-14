from rest_framework import serializers
from .models import Option


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option                                  # Указывает модель, с которой работает этот сериализатор
        fields = ['id', 'option_text', 'question_id']
