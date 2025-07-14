# Используем официальный образ Python в качестве базового образа
FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /code
# Копируем файл requirements.txt внутрь контейнера
COPY requirements.txt /code/
# Устанавливаем зависимости, описанные в файле requirements.txt
RUN pip install -r requirements.txt

COPY . /code/

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]