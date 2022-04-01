# Generated by Django 4.0.2 on 2022-03-15 08:45

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(blank=True, max_length=1000, null=True)),
                ('email', models.EmailField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(default='', max_length=75)),
                ('adress', models.CharField(max_length=100)),
                ('postal_code', models.CharField(max_length=6)),
                ('phone', models.CharField(max_length=9, validators=[django.core.validators.RegexValidator('^\\d{9}$/')])),
                ('full_name', models.CharField(max_length=100)),
                ('product_names', models.TextField(max_length=5000)),
                ('shipment_fee', models.IntegerField(default=0)),
                ('shipment_method', models.CharField(blank=True, max_length=50, null=True)),
                ('transaction_id', models.CharField(default=0, max_length=150)),
                ('total_price', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('accepted', models.BooleanField(default=False)),
                ('shipped', models.BooleanField(default=False)),
            ],
        ),
    ]