# Generated by Django 3.1.7 on 2021-03-29 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0026_auto_20210327_2146'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='count',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='note',
            name='month',
            field=models.IntegerField(default=3),
        ),
        migrations.AddField(
            model_name='note',
            name='year',
            field=models.IntegerField(default=2021),
        ),
    ]
