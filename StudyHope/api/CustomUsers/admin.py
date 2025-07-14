from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import CustomUser

# Register your models here.


class CustomUserAdmin(UserAdmin):
    model = CustomUser              # Связывание админ-интерфейса с моделью CustomUser
    form = UserChangeForm           # Указывает форму, которая будет использоваться для изменения пользователей
    add_form = UserCreationForm     # Указывает форму, которая будет использоваться для добавления новых пользователей

    # Поля для отображения + добавление новых полей
    fieldsets = UserAdmin.fieldsets + (
        ('Раздел преподавателя', {'fields': ('is_teacher', 'educational_subject')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('is_teacher', 'educational_subject')}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
