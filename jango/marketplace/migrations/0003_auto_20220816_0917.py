# Generated by Django 3.1.4 on 2022-08-16 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("marketplace", "0002_auto_20220815_2145"),
    ]

    operations = [
        migrations.RemoveField(model_name="tag", name="nft",),
        migrations.AddField(
            model_name="tag",
            name="nfts",
            field=models.ManyToManyField(to="marketplace.NFT"),
        ),
    ]
