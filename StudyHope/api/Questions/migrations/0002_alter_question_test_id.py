# Generated by Django 5.0.4 on 2024-04-26 15:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Questions', '0001_initial'),
        ('Testings', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='test_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question', to='Testings.testing'),
        ),
    ]
