from rest_framework import serializers
from .models import Content


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content                                 # Указывает модель, с которой работает этот сериализатор
        fields = ['id', 'content_text']
