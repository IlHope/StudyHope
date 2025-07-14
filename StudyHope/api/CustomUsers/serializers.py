from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser                                                                          # Указывает модель, с которой работает этот сериализатор
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'course_id']    # Перечисляет поля, которые будут сериализованы и десериализованы
        read_only_fields = ['id', 'course_id']                                                      # Поля, которые будут доступны только для чтения при сериализации
        extra_kwargs = {'password': {'write_only': True}}                                           # Позволяет задать дополнительные аргументы для отдельных полей

    # Переопределение методов `create` и `update`
    def create(self, validated_data):                                                               # validated_data - словарь с данными, прошедшие валидацию
        user = CustomUser(**validated_data)                                                         # Создает новый объект пользователя с данными
        user.set_password(validated_data['password'])                                               # Использует метод модели для надёжного хэширования пароля
        user.save()                                                                                 # Сохраняет нового пользователя в базе данных
        return user

    def update(self, instance, validated_data):                                                     # instance - текущий объект пользователя
        password = validated_data.pop('password', None)                                             # Если новый пароль передан, его удаляют из валидационных данных, чтобы обновление других полей происходило без пароля
        instance = super().update(instance, validated_data)                                         # Использует стандартный механизм обновления от `ModelSerializer`
        if password:
            instance.set_password(password)                                                         # Обновляет пароль, если новый пароль был передан. Метод set_password автоматически хэширует пароль перед его сохранением в базе данных
            instance.save()                                                                         # Сохраняет изменения в базе данных.
        return instance

    # Кастомная валидация полей
    def validate_first_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("Имя должно содержать только буквы.")
        return value

    def validate_last_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("Фамилия должна содержать только буквы.")
        return value

    def validate_educational_subject(self, value):
        if value and not value.isalpha():
            raise serializers.ValidationError("Образовательный предмет должен содержать только буквы или быть пустым.")
        return value

