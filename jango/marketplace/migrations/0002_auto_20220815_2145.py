# Generated by Django 3.1.4 on 2022-08-15 21:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("marketplace", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(model_name="nft", name="mint_number",),
        migrations.AddField(
            model_name="nft", name="date", field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name="nft",
            name="is_listed",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="nft", name="tokenId", field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name="nft",
            name="tokenUri",
            field=models.CharField(default="", max_length=255),
        ),
        migrations.AlterField(
            model_name="adminwallet",
            name="id",
            field=models.AutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="attribute",
            name="id",
            field=models.AutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="nft",
            name="id",
            field=models.AutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="nft", name="image", field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name="trad",
            name="id",
            field=models.AutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.CreateModel(
            name="Tag",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, unique=True)),
                (
                    "nft",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tags",
                        to="marketplace.nft",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Collection",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, unique=True)),
                (
                    "nft",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="collection",
                        to="marketplace.nft",
                    ),
                ),
            ],
        ),
    ]