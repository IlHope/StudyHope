from rest_framework import serializers
from .models import Result
from api.Testings.models import Testing


class ResultSerializer(serializers.ModelSerializer):
    # test_name — это новое поле, которое будет добавлено к сериализованным данным
    #  serializers.CharField — это тип поля, который будет сериализовать данные как строку
    # source='test_id.testing_name' — это путь к полю в связанной модели. Поле test_id в модели Result ссылается на модель Testing, и у этой модели есть поле testing_name. Таким образом, source указывает на поле связанной модели, значение которого будет использовано для test_name
    test_name = serializers.CharField(source='test_id.testing_name', read_only=True)

    class Meta:
        model = Result                                                                  # Указывает модель, с которой работает этот сериализатор
        fields = ['id', 'score', 'date_completion', 'test_name']
