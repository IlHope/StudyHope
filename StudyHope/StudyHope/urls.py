"""
URL configuration for StudyHope project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.conf import settings
from django.conf.urls.static import static

# Список, содержащий маршруты и обработчики
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.Testings.urls')),
    path('api/', include('api.Questions.urls')),
    path('api/', include('api.Options.urls')),
    path('api/', include('api.Answers.urls')),
    path('api/', include('api.Results.urls')),
    path('api/', include('api.Courses.urls')),
    path('api/', include('api.Chapters.urls')),
    path('api/', include('api.Content.urls')),
    path('api/auth/', include('rest_framework.urls')),
    path('api/', include('api.CustomUsers.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
