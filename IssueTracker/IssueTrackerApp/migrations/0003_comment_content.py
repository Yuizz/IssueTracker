# Generated by Django 3.1.7 on 2021-03-21 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('IssueTrackerApp', '0002_auto_20210320_1155'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='content',
            field=models.CharField(default='', max_length=300),
            preserve_default=False,
        ),
    ]
