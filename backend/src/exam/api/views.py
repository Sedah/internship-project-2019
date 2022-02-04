import json
import random
import pytz
import os
import datetime
from exam import models
from . import serializers
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from django.core.files.storage import default_storage
from django.core.mail import send_mass_mail
from django.conf import settings
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.db.models import F

from dateutil import parser
from django.utils import timezone
from django.db.models import Max, Sum, FileField
from pprint import pprint
from custom_user.models import Profile


class SubjectListView(viewsets.ModelViewSet):
    queryset = models.Subject.objects.all()
    serializer_class = serializers.SubjectSerializer


class TopicListView(viewsets.ModelViewSet):
    queryset = models.Topic.objects.all()
    serializer_class = serializers.TopicSerializer


class ExamListView(viewsets.ModelViewSet):
    queryset = models.Exam.objects.all().order_by('-created_on')
    serializer_class = serializers.ExamSerializer

    def perform_create(self, serializer):
        # print(self,serializer)
        serializer.save()
        # print(serializer.data)
        topic_id = serializer.data['topic']
        total_exam = models.Exam.objects.filter(
            topic_id=topic_id).count()
        models.Topic.objects.filter(topic_id=topic_id).update(
            total_exam=total_exam)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # print("instance",instance.exam_id)
        # pprint(vars(instance)) # property of object
        topic_id = instance.topic_id
        self.perform_destroy(instance)
        total_exam = models.Exam.objects.filter(
            topic_id=topic_id).count()
        # print(total_exam)
        models.Topic.objects.filter(topic_id=topic_id).update(
            total_exam=total_exam)
        return Response(status=status.HTTP_204_NO_CONTENT)


class AssignListView(viewsets.ModelViewSet):
    queryset = models.Assign_Exam.objects.all()
    serializer_class = serializers.AssignExamSerializer

    def create(self, request):
        exam_data = request.data["exam"]
        user_data = request.data["user"]
        recipient_list = []
        try:
            limit_data = request.data["limit"]
        except:
            limit_data = None
        try:
            start_date = request.data["start_date"]
            end_date = request.data["end_date"]
        except:
            start_date = None
            end_date = None

        for exam_item in exam_data:
            exam = models.Exam.objects.get(exam_id=exam_item)
            # print(exam) <<< instance
            for user_item in user_data:
                user = User.objects.get(id=user_item)
                email = user.email
                print(email)
                assign = models.Assign_Exam.objects.create(
                    assign_exam=exam, user=user, limit=limit_data, start_date=start_date, end_date=end_date)
                # why in loop?
                # cause if use list of email will see all the recipient list
                subject = 'Your new exam has arrived!'
                message_body = render_to_string("assignexam.html")
                email_from = settings.EMAIL_HOST_USER
                datatuple = (
                    (subject, message_body, email_from, [email]),
                )

                send_mass_mail(datatuple)

        return Response(status=status.HTTP_201_CREATED)


class Exam_QuestionListView(viewsets.ModelViewSet):
    queryset = models.Exam_Question.objects.all()
    serializer_class = serializers.Exam_QuestionSerializer

    def perform_create(self, serializer):
        serializer.save()
        exam_id = serializer.data['exam']
        total_question = models.Exam_Question.objects.filter(
            exam_id=exam_id).count()
        models.Exam.objects.filter(exam_id=exam_id).update(
            total_question=total_question)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # print("instance",instance.exam_id)
        # pprint(vars(instance)) # property of object
        exam_id = instance.exam_id
        self.perform_destroy(instance)
        total_question = models.Exam_Question.objects.filter(
            exam_id=exam_id).count()
        # print(total_question)
        models.Exam.objects.filter(exam_id=exam_id).update(
            total_question=total_question)
        return Response(status=status.HTTP_204_NO_CONTENT)


class Exam_QuestionDetailView(viewsets.ModelViewSet):
    queryset = models.Exam_Question.objects.all()
    serializer_class = serializers.Exam_QuestionSerializer


class ImageListView(viewsets.ModelViewSet):
    queryset = models.Image.objects.all()
    serializer_class = serializers.ImageSerializer

    def create(self, request, *args, **kwargs):
        imageSet = request.data
        # print("set", imageSet)
        imageList = []
        key = 1
        for key in imageSet:
            if(key != "question"):
                imageList.append(imageSet[key])
        for image in imageList:
            # print(models.Exam_Question(question=imageSet["question"]))
            models.Image.objects.create(question=models.Exam_Question(question_id=imageSet["question"]),
                                        image=image)
        return Response(status=status.HTTP_201_CREATED)


class Exam_ChoiceListView(viewsets.ModelViewSet):
    queryset = models.Exam_Choice.objects.all()
    serializer_class = serializers.Exam_ChoiceSerializer


class User_AttemptListView(viewsets.ModelViewSet):
    queryset = models.User_Attempt.objects.all()
    serializer_class = serializers.User_AttemptSerializer

    def perform_create(self, serializer):
        # print(self.request.data)
        serializer.validated_data['total_attempted'] = len(
            serializer.validated_data['attempt_detail'])
        exam_id = serializer.validated_data['exam'].exam_id
        attempt_data = self.request.data.get('attempt_detail')
        validate_data = serializer.validated_data['attempt_detail']
        # print(serializer.validated_data)
        total_correct = 0
        # User_Attempt.objects.filter(attempt_id=attempt_id).update(
        #     total_attempted=total_attempted)
        for item in validate_data:
            # print(item)
            correct_answer_list = []
            item["examm_id"] = exam_id
            attempt_detail_id = item.get('attempt_detail_id', None)
            question_id = item.get('q').question_id
            correct_answer = ''
            # print(question_id)
            choices = models.Exam_Choice.objects.filter(
                question_id=question_id).values_list('choice', 'correct_answer')
            question = models.Exam_Question.objects.get(
                question_id=question_id)
            # pprint(vars(question))
            if (question.question_type == "Multiple Choice - Multiple answer"):
                for choice in choices:
                    if (choice[1] == True):
                        correct_answer_list.append(choice[0])
                        correct_answer = choice[0]
                        correct_answer_list_json = json.dumps(
                            correct_answer_list, separators=(',', ':'))
                        # print(correct_answer_list_json)
                        item["correct_answer"] = correct_answer_list_json
                choose_answer = item.get('choose_answer')
                try:
                    data = json.loads(choose_answer)
                except ValueError as e:
                    print("not JSON")
                if (choose_answer == correct_answer_list_json):
                    item["is_correct"] = True
                    total_correct += 1
                else:
                    item["is_correct"] = False

            elif (question.question_type == "Free Text"):
                for choice in choices:
                    # print(choice)
                    if (choice[1] == True):
                        correct_answer_list.append(choice[0])
                        correct_answer = choice[0]
                        correct_answer_list_json = json.dumps(
                            correct_answer_list, separators=(',', ':'))
                        # print(correct_answer_list_json)
                        item["correct_answer"] = correct_answer_list_json
                choose_answer_json = item.get('choose_answer')
                choose_answer = json.loads(choose_answer_json)
                # print(choose_answer)
                if (choose_answer[0] in correct_answer_list):
                    item["is_correct"] = True
                    total_correct += 1
                    break
                else:
                    item["is_correct"] = False
            else:
                if not choices:
                    choose_answer = item.get('choose_answer')
                else:
                    # check correct for one answer
                    for choice in choices:
                        if (choice[1] == True):
                            correct_answer = choice[0]
                            item["correct_answer"] = correct_answer
                    choose_answer = item.get('choose_answer')
                    if (choose_answer == correct_answer):
                        item["is_correct"] = True
                        total_correct += 1
                    else:
                        item["is_correct"] = False

        # User_Attempt.objects.filter(attempt_id=attempt_id).update(
        #     total_correct=total_correct)
        serializer.validated_data['total_correct'] = total_correct
        # print(serializer.validated_data)
        serializer.save()

        total_people_try = models.User_Attempt.objects.filter(
            exam_id=exam_id).count()
        models.Exam.objects.filter(exam_id=exam_id).update(
            total_people_try=total_people_try)
        # print(models.Exam.objects.filter(exam_id=exam_id))

    def get_queryset(self):
        return models.User_Attempt.objects.all().order_by('-created_on')


class User_Attempt_DetailListView(viewsets.ModelViewSet):
    queryset = models.User_Attempt_Detail.objects.all()
    serializer_class = serializers.User_Attempt_DetailSerializer

    def update(self, request, *args, **kwargs):
        attempt_id = request.data['attempt_id']
        attempt_user = request.data['attempt_user']
        question = request.data['question_text']
        exam_id = request.data['examm_id']
        exam = models.Exam.objects.get(exam_id=exam_id)
        exam_title = exam.title
        # print(exam_title)
        user = Profile.objects.get(id=attempt_user)
        email = user.email
        attempt_detail_id = request.data['attempt_detail_id']
        marking = request.data['is_correct']
        q_id = request.data['q_id']
        current_marking = models.User_Attempt_Detail.objects.get(
            attempt_detail_id=attempt_detail_id, q_id=q_id)
        if (marking == True and current_marking.is_correct == None):
            models.User_Attempt.objects.filter(attempt_id=attempt_id).update(
                total_correct=F('total_correct') + 1)
        elif (marking == True and current_marking.is_correct == False):
            models.User_Attempt.objects.filter(attempt_id=attempt_id).update(
                total_correct=F('total_correct') + 1)
        elif (marking == False and current_marking.is_correct == True):
            models.User_Attempt.objects.filter(attempt_id=attempt_id).update(
                total_correct=F('total_correct') - 1)
        else:
            (models.User_Attempt.objects.filter(attempt_id=attempt_id).update(
                total_correct=F('total_correct')))

        subject = 'Your answer in Online Examination has been Reviewed!'
        message = {
            "question": question,
            "exam": exam_title
        }
        message_body = render_to_string("reviewanswer.html", message)
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email, ]
        datatuple = (
                    (subject, message_body, email_from, [email]),
        )

        send_mass_mail(datatuple)

        return super(User_Attempt_DetailListView, self).update(request, *args, **kwargs)


# select all question in 1 exam for attempt

class Exam_ExamQuestionListView(viewsets.ModelViewSet):
    queryset = models.Exam_Question.objects.all()
    serializer_class = serializers.Exam_QuestionSerializer

    def get_queryset(self):
        user_id = self.request.GET.get('user_id', '')
        # print(self.kwargs['exam_id'])
        # print(self.request.GET.get('user_id', ''))
        attempt_limit = models.Exam.objects.get(
            exam_id=self.kwargs['exam_id']).limit
        # print("limit>>>>", attempt_limit)
        attempt_count = models.User_Attempt.objects.filter(
            exam_id=self.kwargs['exam_id'], user_id=user_id).count()
        # print("count>>>", attempt_count)
        if(attempt_limit == None or attempt_count <= attempt_limit):
            show_question = models.Exam.objects.get(
                exam_id=self.kwargs['exam_id']).show_question
            is_random = models.Exam.objects.get(
                exam_id=self.kwargs['exam_id']).is_random
            if is_random:
                valid_question_id_list = list(models.Exam_Question.objects.filter(
                    exam_id=self.kwargs['exam_id']).values_list('question_id', flat=True))
                # print(valid_question_id_list)
                random_question_id_list = random.sample(
                    valid_question_id_list, min(len(valid_question_id_list), show_question))
                # print(random_question_id_list)
                query_set = models.Exam_Question.objects.filter(
                    question_id__in=random_question_id_list).order_by('?')
                # print(query_set)
                return query_set
            else:
                return models.Exam_Question.objects.filter(exam_id=self.kwargs['exam_id'])
        else:
            return []

# select all question in 1 exam for edit


class QuestionListView(viewsets.ModelViewSet):
    queryset = models.Exam_Question.objects.all()
    serializer_class = serializers.Exam_QuestionSerializer

    def get_queryset(self):
        return models.Exam_Question.objects.filter(exam_id=self.kwargs['exam_id'])

# select all attempt in 1 user


class AttemptHistoryListView(viewsets.ModelViewSet):
    queryset = models.User_Attempt.objects.all()
    serializer_class = serializers.User_AttemptSerializer

    def get_queryset(self):
        return models.User_Attempt.objects.filter(user_id=self.kwargs['user_id']).order_by('-created_on')

# select all exam that have essay answer(for admin)


class ExamEssayListView(viewsets.ModelViewSet):
    queryset = models.Exam.objects.all()
    serializer_class = serializers.ExamSerializer

    def get_queryset(self):
        answerset = models.User_Attempt_Detail.objects.all()
        serializer = serializers.User_Attempt_DetailSerializer(
            answerset, many=True)
        data = serializer.data
        valid_exam_id_list = []
        for item in data:
            if (item['q_type'] == "Essay"):
                valid_exam_id_list.append(item['examm'])
        return models.Exam.objects.filter(exam_id__in=valid_exam_id_list).order_by('-created_on')

# select all exam that have essay answer(for instructor)


class ExamEssayListForInstructorView(viewsets.ModelViewSet):
    queryset = models.Exam.objects.all()
    serializer_class = serializers.ExamSerializer

    def get_queryset(self):
        answerset = models.User_Attempt_Detail.objects.all()
        serializer = serializers.User_Attempt_DetailSerializer(
            answerset, many=True)
        print(self.request)

        data = serializer.data

        valid_exam_id_list = []
        for item in data:
            if (item['q_type'] == "Essay"):
                creator_id = models.Exam.objects.filter(
                    exam_id=item['examm']).values_list('user_id', flat=True).get()
                print(creator_id)
                print(self.kwargs['user_id'])
                if (creator_id == self.kwargs['user_id']):
                    valid_exam_id_list.append(item['examm'])
        return models.Exam.objects.filter(exam_id__in=valid_exam_id_list).order_by('-created_on')

# select all essay answer in 1 exam


class AnsweredEssayListView(viewsets.ModelViewSet):
    queryset = models.User_Attempt_Detail.objects.all()
    serializer_class = serializers.User_Attempt_DetailSerializer

    def get_queryset(self):
        answerset = models.User_Attempt_Detail.objects.all()
        serializer = serializers.User_Attempt_DetailSerializer(
            answerset, many=True)
        data = serializer.data
        valid_answer_id_list = []
        valid_item = []

        for item in data:
            # if(item not in dup_items):
            if ((item['examm'] == self.kwargs['exam_id']) and item['q_type'] == "Essay"):
                valid_answer_id_list.append(item['attempt_detail_id'])
                valid_item.append(item)
        # print(valid_answer_id_list)
        return models.User_Attempt_Detail.objects.filter(attempt_detail_id__in=valid_answer_id_list).order_by('-created_on')


# select all exam create history in 1 user


class ExamHistoryListView(viewsets.ModelViewSet):
    queryset = models.Exam.objects.all()
    serializer_class = serializers.ExamSerializer

    def get_queryset(self):
        return models.Exam.objects.filter(user_id=self.kwargs['user_id']).order_by('-created_on')

# select all assign exam in 1 user


class AssignExamListView(viewsets.ModelViewSet):
    queryset = models.Assign_Exam.objects.all()
    serializer_class = serializers.AssignExamSerializer

    def get_queryset(self):
        first_validate_list = models.Assign_Exam.objects.filter(
            user_id=self.kwargs['user_id'])
        serializer = serializers.AssignExamSerializer(
            first_validate_list, many=True)
        data = serializer.data
        today = datetime.datetime.now()
        print(today)
        today = pytz.utc.localize(today)
        valid_assign_list = []
        print("after pytz",today)

        for item in data:
            try:
                end_date = parser.parse(item['end_date'])
                start_date = parser.parse(item['start_date'])
                print(end_date)
                print(start_date)
            except:
                end_date = None
                start_date = None
            if (item['end_date'] == None and item['start_date'] == None):
                valid_assign_list.append(item['id'])
            else:
                if (today < end_date and today > start_date):
                    valid_assign_list.append(item['id'])
        print(valid_assign_list)
        return models.Assign_Exam.objects.filter(id__in=valid_assign_list).order_by('-assigned_on')

# select all public exam in 1 subject


class PublicExamListView(viewsets.ModelViewSet):
    queryset = models.Exam.objects.all()
    serializer_class = serializers.ExamSerializer

    def get_queryset(self):
        first_validate_list = models.Exam.objects.filter(
            is_public=True, topic_id=self.kwargs['topic_id'])
        serializer = serializers.ExamSerializer(
            first_validate_list, many=True)
        data = serializer.data
        today = datetime.datetime.now()
        today = pytz.utc.localize(today)
        valid_public_list = []
        # print(today)

        for item in data:
            try:
                # start_time = item['end_date'].replace(tzinfo=utc)
                # end_time = item['end_date'].replace(tzinfo=utc)
                end_date = parser.parse(item['end_date'])
                start_date = parser.parse(item['start_date'])
            except:
                end_date = None
                start_date = None
            if (item['end_date'] == None and item['start_date'] == None):
                valid_public_list.append(item["exam_id"])
            else:
                if (today < end_date and today > start_date):
                    print(end_date)
                    print(today)
                    valid_public_list.append(item["exam_id"])

        # print(valid_public_list)
        return models.Exam.objects.filter(exam_id__in=valid_public_list).order_by('-created_on')

# select all private exam


class PrivateExamListView(viewsets.ModelViewSet):
    queryset = models.Exam.objects.all()
    serializer_class = serializers.ExamSerializer

    def get_queryset(self):
        return models.Exam.objects.filter(is_public=False)


# select top 10 for exam ranking

class LeaderBoardListView(viewsets.ModelViewSet):
    queryset = models.User_Attempt.objects.all()
    serializer_class = serializers.User_AttemptSerializer

    def get_queryset(self):
        exam_id = self.kwargs['exam_id']
        top_user = models.User_Attempt.objects.annotate(total_correct_temp=Max(
            "total_correct")).raw('SELECT * FROM examination.exam_user_attempt WHERE exam_id = %s GROUP BY user_id ORDER BY total_correct DESC LIMIT 10;' % exam_id)
        # print(top_user)

        return top_user

# select top 10 for one subject


class SubjectLeaderBoardListView(APIView):

    def get(self, request, *args, **kwargs):
        print(request)

        print(kwargs.get('subject_id'))
        subject_id = kwargs.get('subject_id')

        sql = 'SELECT *, SUM(total_correct) as high_score FROM examination.exam_user_attempt as user_attempt join examination.exam_exam as exam \
        on user_attempt.exam_id = exam.exam_id join examination.exam_topic as topic \
        on exam.topic_id = topic.topic_id join examination.exam_subject as subject \
        on topic.subject_id = subject.subject_id WHERE subject.subject_id = %s and exam.limit = 1  GROUP BY user_attempt.user_id ORDER BY high_score DESC LIMIT 10;'
        leaderboard = []

        for i in models.User_Attempt.objects.raw(sql % subject_id,  translations=None):
            print(i)
            user = User.objects.get(id=i.user_id)
            full_name = "%s %s" % (str(user.first_name), user.last_name)
            obj = {
                'full_name': full_name,
                'high_score': i.high_score
            }
            leaderboard.append(obj)
            print(leaderboard)

        # top_user = models.User_Attempt.objects.extra(
        #     select={'SELECT *, SUM(total_correct) as high_score FROM examination.exam_user_attempt as user_attempt join examination.exam_exam as exam \
        # on user_attempt.exam_id = exam.exam_id join examination.exam_topic as topic \
        # on exam.topic_id = topic.topic_id join examination.exam_subject as subject \
        # on topic.subject_id = subject.subject_id WHERE subject.subject_id = %s and exam.limit = 1  GROUP BY user_attempt.user_id ORDER BY total_correct ASC LIMIT 10;'},
        #     select_params=(subject_id,),
        # )
        # for user in top_user:

        #     pprint(vars(top_user))
        #     print(top_user.attempt_id)

        return Response(leaderboard)
