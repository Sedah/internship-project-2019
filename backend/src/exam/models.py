from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.dispatch import receiver

class Subject(models.Model):

    subject_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)
    update_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s: %s" % (str(self.subject_id), self.title)

class Topic(models.Model):

    topic_id = models.AutoField(primary_key=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    total_exam = models.IntegerField(default=0)
    topic = models.CharField(max_length=255)

    def __str__(self):
        return "%s: %s" % (str(self.topic_id), self.topic)


class Exam(models.Model):

    exam_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=255)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, null=True)
    total_people_try = models.IntegerField(default=0)
    total_question = models.IntegerField(default=0)
    show_question = models.IntegerField(default=1)
    is_public = models.BooleanField(default=1)
    is_random = models.BooleanField(default=0)
    timer = models.IntegerField(default=None, null=True,blank=True,)
    limit = models.IntegerField(default=None, null=True,blank=True,)
    start_date = models.DateTimeField(null=True,blank=True,)
    end_date = models.DateTimeField(null=True,blank=True,)
    created_on = models.DateTimeField(auto_now_add=True)
    update_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s: %s" % (str(self.exam_id), self.title)


class Exam_Question(models.Model):

    question_id = models.AutoField(primary_key=True)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    question = models.TextField(null=True, blank=True)
    question_type = models.CharField(max_length=100)
    created_on = models.DateTimeField(auto_now_add=True)
    update_on = models.DateTimeField(auto_now=True)


class Assign_Exam(models.Model):
    id = models.AutoField(primary_key=True)
    assign_exam = models.ForeignKey(
        Exam, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    assigned_on = models.DateTimeField(auto_now_add=True, null=True)
    limit = models.IntegerField(default=None, null=True, blank=True,)
    start_date = models.DateTimeField(null=True,blank=True,)
    end_date = models.DateTimeField(null=True,blank=True,)

# no duplicate assign allow!
    class Meta:
        unique_together = (("assign_exam", "user"),)


class Image(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.ForeignKey(
        Exam_Question, on_delete=models.CASCADE, related_name="image")
    image = models.ImageField(upload_to='image/question/', null=True)

class Exam_Choice(models.Model):

    choice_id = models.AutoField(primary_key=True)
    question = models.ForeignKey(
        Exam_Question, on_delete=models.CASCADE, related_name="choice")
    choice = models.TextField()
    correct_answer = models.BooleanField()
    explaination = models.TextField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    update_on = models.DateTimeField(auto_now=True)


class User_Attempt(models.Model):

    attempt_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exam = models.ForeignKey(
        Exam, on_delete=models.CASCADE, related_name="exam")
    total_attempted = models.IntegerField(default=0)
    total_correct = models.IntegerField(default=0)
    current_total_question = models.IntegerField(default=1)
    created_on = models.DateTimeField(auto_now_add=True)
    update_on = models.DateTimeField(auto_now=True)


class User_Attempt_Detail(models.Model):

    attempt_detail_id = models.AutoField(primary_key=True)
    attempt = models.ForeignKey(
        User_Attempt, on_delete=models.CASCADE, related_name="attempt_detail")
    q = models.ForeignKey(
        Exam_Question, on_delete=models.CASCADE, related_name="q_id")
    examm = models.ForeignKey(
        Exam, on_delete=models.CASCADE, related_name="examm",  null=True)
    question_text = models.TextField()
    choose_answer = models.TextField()
    correct_answer = models.TextField(blank=True)
    is_correct = models.BooleanField(null=True, blank=True, default=None)
    created_on = models.DateTimeField(auto_now_add=True)
    update_on = models.DateTimeField(auto_now=True)
