from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Result
from .serializers import ResultSerializer

# Create your views here.


class ResultViewSet(viewsets.ModelViewSet):                                             # ModelViewSet предоставляет реализацию стандартных действий CRUD (Create, Retrieve, Update, Delete)
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    # @action - декоратор
    # detail=False - указывает, что это действие будет применено к набору объектов, а не к одному объекту
    # url_path='user-results/(?P<user_id>\d+)' - устанавливает URL путь для этого действия и задает шаблон для захвата user_id из URL
    # () — круглыми скобками обозначается группа захвата в регулярном выражении, которая используется для извлечения части строки
    # ?P<user_id> — это синтаксис Python для именования группы захвата. Группа будет называться user_id
    # \d — это метасимвол, который соответствует любому цифровому символу
    # + — квантификатор, который означает "один или несколько". Таким образом, \d+ будет соответствовать одной или более цифрам
    @action(detail=False, methods=['get'], url_path='user-results/(?P<user_id>\d+)')
    def user_results(self, request, user_id=None):
        results = self.queryset.filter(student_id=user_id)                              # user_id взят из url_path и содержит числовое значение
        serializer = self.get_serializer(results, many=True)
        return Response(serializer.data)
