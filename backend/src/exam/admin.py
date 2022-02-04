from django.contrib import admin

# from exam.models import Exam,Subject,Exam_Question,Image,Exam_Choice,User_Attempt,User_Attempt_Detail
from custom_user import models as user_models
from exam import models as exam_models

admin.site.register(exam_models.Exam)
admin.site.register(exam_models.Subject)
admin.site.register(exam_models.Topic)
admin.site.register(exam_models.Exam_Question)
admin.site.register(exam_models.Image)
admin.site.register(exam_models.Exam_Choice)
admin.site.register(exam_models.Assign_Exam)
admin.site.register(exam_models.User_Attempt)
admin.site.register(exam_models.User_Attempt_Detail)
