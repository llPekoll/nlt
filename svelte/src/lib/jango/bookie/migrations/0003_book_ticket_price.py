# Generated by Django 3.1.4 on 2022-06-12 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bookie", "0002_auto_20220612_2200"),
    ]

    operations = [
        migrations.AddField(
            model_name="book",
            name="ticket_price",
            field=models.IntegerField(default=300),
        ),
    ]
