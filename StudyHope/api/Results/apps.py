from django.apps import AppConfig


class ResultsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'    # Это атрибут, который задает тип поля автоинкремента по умолчанию для всех моделей в данном приложении.
    name = 'api.Results'
