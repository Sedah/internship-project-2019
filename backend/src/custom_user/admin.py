from django.contrib import admin

# from exam.models import Exam,Subject,Exam_Question,Image,Exam_Choice,User_Attempt,User_Attempt_Detail
from custom_user import models as user_models

admin.site.register(user_models.Profile)