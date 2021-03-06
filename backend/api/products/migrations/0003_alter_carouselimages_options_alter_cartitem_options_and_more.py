# Generated by Django 4.0.2 on 2022-04-03 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='carouselimages',
            options={'verbose_name': 'Zdjęcie w Karuzeli', 'verbose_name_plural': 'Zdjęcia w Karuzeli'},
        ),
        migrations.AlterModelOptions(
            name='cartitem',
            options={'verbose_name': 'Przedmiot w Koszyku', 'verbose_name_plural': 'Przedmioty w Koszyku'},
        ),
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'Kategoria', 'verbose_name_plural': 'Kategorie'},
        ),
        migrations.AlterModelOptions(
            name='code',
            options={'verbose_name': 'Kod', 'verbose_name_plural': 'Kody'},
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'verbose_name': 'Produkt', 'verbose_name_plural': 'Produkty'},
        ),
        migrations.AlterModelOptions(
            name='productimage',
            options={'verbose_name': 'Zdjęcie Produktu', 'verbose_name_plural': 'Zdjęcia Produktów'},
        ),
        migrations.AlterModelOptions(
            name='productstock',
            options={'verbose_name': 'Wyposarzenie w Produkt', 'verbose_name_plural': 'Wyposarzenie w Produkty'},
        ),
        migrations.AlterField(
            model_name='productstock',
            name='size',
            field=models.CharField(max_length=12),
        ),
    ]
