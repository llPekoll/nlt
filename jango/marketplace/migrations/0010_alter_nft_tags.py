# Generated by Django 4.1 on 2022-08-17 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("marketplace", "0009_nft_creator"),
    ]

    operations = [
        migrations.AlterField(
            model_name="nft",
            name="tags",
            field=models.ManyToManyField(blank=True, null=True, to="marketplace.tag"),
        ),
    ]
