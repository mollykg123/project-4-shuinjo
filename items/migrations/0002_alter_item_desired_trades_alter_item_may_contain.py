# Generated by Django 4.2.13 on 2024-05-30 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='desired_trades',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='may_contain',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]