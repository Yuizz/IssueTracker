# Generated by Django 3.1.7 on 2021-05-26 20:16

import colorfield.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('IssueTrackerApp', '0003_comment_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='label',
            name='color',
            field=colorfield.fields.ColorField(default='#C2C2C2', max_length=18),
        ),
        migrations.AlterField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='issue',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='issues', to='IssueTrackerApp.project'),
        ),
    ]
