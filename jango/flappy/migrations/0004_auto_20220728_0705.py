# Generated by Django 3.1.4 on 2022-07-28 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flappy', '0003_auto_20220728_0704'),
    ]

    operations = [
        migrations.AddField(
            model_name='week',
            name='third_bounty',
            field=models.IntegerField(default=25),
        ),
        migrations.AlterField(
            model_name='week',
            name='second_bounty',
            field=models.IntegerField(default=100),
        ),
    ]
