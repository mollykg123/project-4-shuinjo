# Generated by Django 4.2.13 on 2024-05-30 13:22

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0002_alter_item_desired_trades_alter_item_may_contain'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='desired_trades',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), blank=True, null=True, size=None),
        ),
        migrations.AlterField(
            model_name='item',
            name='may_contain',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), blank=True, null=True, size=None),
        ),
    ]
