# Generated by Django 5.0.4 on 2024-05-05 13:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Courses', '0001_initial'),
        ('Testings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='testing',
            name='course_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='testing', to='Courses.course'),
            preserve_default=False,
        ),
    ]
