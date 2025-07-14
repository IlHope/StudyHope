from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

from api.CustomUsers.models import CustomUser
from api.Testings.models import Testing
from api.Questions.models import Question
from api.Options.models import Option
from api.Results.models import Result

# Create your views here.

# @csrf_exempt - этот декоратор отключает проверку CSRF для данной вью-функции
# @require_POST - этот декоратор гарантирует, что функция будет обрабатывать только POST-запросы
@csrf_exempt
@require_POST
def submit_answers(request):                                                                        # Определяет функцию представления для обработки отправки ответов на тест
    import json
    data = json.loads(request.body)                                                                 # Преобразует JSON строку в объект Python (словарь)
    student_id = data.get('student_id')                                                             # Извлекает данные из полученного JSON объекта
    test_id = data.get('test_id')
    answers = data.get('answers')                                                                   # Предполагается что это словарь вида {question_id: option_id}

    try:                                                                                            # Проверка наличия пользователя и теста
        user = CustomUser.objects.get(pk=student_id)                                                # Получает запись пользователя из базы данных по  идентификатору.
        test = Testing.objects.get(pk=test_id)                                                      # Получает запись теста из базы данных по идентификатору.
    except (CustomUser.DoesNotExist, Testing.DoesNotExist):                                         # Если пользователь или тест не найдены, возвращается JSON-ответ с ошибкой и статусом 400 (Bad Request)
        return JsonResponse({'error': 'Неверные данные пользователя или теста'}, status=400)

    score = 0
    total_questions = len(answers)

    for question_id, option_id in answers.items():                                                          # Итерация по каждому вопросу и ответу
        question = Question.objects.get(id=question_id)

        if question.question_type == 'MC':
            correct_option = Option.objects.filter(question_id=question, isCorrect=True).first()            # Находит правильный вариант ответа для данного вопроса
            if correct_option and correct_option.id == int(option_id):
                score += 1
        elif question.question_type == 'OE':
            correct_option = Option.objects.filter(question_id=question, isCorrect=True).first()
            if correct_option and correct_option.option_text.lower().strip() == option_id.lower().strip():
                score += 1

    result = Result(score=score, test_id=test)                                                              # Создает новый объект результата с подсчитанными очками и ссылкой на тест
    result.save()                                                                                           # Сохраняет объект результата в базе данных
    result.student_id.add(user)                                                                             # Добавляет пользователя к результату

    return JsonResponse({'score': score, 'total_questions': total_questions})
