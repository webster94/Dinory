# Generated by Django 3.1.7 on 2021-03-22 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0008_diary_note'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='img',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
