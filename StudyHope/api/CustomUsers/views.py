from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser
from .serializers import CustomUserSerializer
from api.Courses.serializers import CourseSerializer

# Create your views here.


class CustomUserViewSet(viewsets.ModelViewSet):                                                             # ModelViewSet предоставляет реализацию стандартных действий CRUD (Create, Retrieve, Update, Delete)
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    # Декораторы, которые позволяют определять дополнительные действия в ViewSet
    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):                                                                            # detail=False - указывает, что действие относятcя ко всему viewset, а не к конкретному объекту
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():                                                                           # Создает нового пользователя, если данные валидны
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get', 'put'], url_path='profile')
    def get_update_user_profile(self, request):
        if not request.user.is_authenticated:
            return Response({'message': 'Пользователь неавторизован'}, status=status.HTTP_401_UNAUTHORIZED)
        if request.method == 'GET':
            serializer = self.get_serializer(request.user)                                                  # self.get_serializer - возвращает сериализатор, связанный с данным ViewSet
            return Response(serializer.data)                                                                # request.user - возвращает текущего аутентифицированного пользователя, отправившего запрос
        elif request.method == 'PUT':
            serializer = self.get_serializer(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='logout')
    def logout(self, request):                                                                              # Нужен для выхода пользователя из системы, помечая токен обновления как "черный"
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])                                                                   # detail=True - указывает, что метод будет действовать над одним объектом. Значит, метод будет применяться к определенному пользователю (например, /users/{pk}/courses/)
    def courses(self, request, pk=None):                                                                    # request - объект запроса, который содержит всю информацию о текущем HTTP-запросе, инициированном клиентом
        user = self.get_object()                                                                            # Получает объект пользователя на основе переданного первичного ключа (pk)
        courses = user.course_id.all()                                                                      # Возвращает все курсы, связанные с пользователем
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

