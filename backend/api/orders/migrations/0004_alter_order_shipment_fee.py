# Generated by Django 4.0.2 on 2022-03-15 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='shipment_fee',
            field=models.CharField(default='0', max_length=10),
        ),
    ]
