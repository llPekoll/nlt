# Generated by Django 4.1 on 2022-08-18 22:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("marketplace", "0011_rename_is_listed_nft_is_hidden"),
    ]

    operations = [
        migrations.AddField(
            model_name="nft", name="is_listed", field=models.BooleanField(default=True),
        ),
    ]