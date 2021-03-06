# Generated by Django 2.2.2 on 2019-11-06 02:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exam', '0006_auto_20191105_1548'),
    ]

    operations = [
        migrations.AddField(
            model_name='assign_exam',
            name='end_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='assign_exam',
            name='limit',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='assign_exam',
            name='start_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='exam',
            name='limit',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='exam',
            name='timer',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
