from rest_framework import serializers
# from exam.models import  Subject, Exam, Exam_Question, Exam_Choice, User_Attempt, User_Attempt_Detail
from exam import models
from rest_framework.fields import Field
from django.contrib.auth.models import User
from rest_auth.registration.serializers import RegisterSerializer
from pprint import pprint


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subject
        fields = "__all__"

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Topic
        fields = "__all__"

class User_Attempt_DetailSerializer(serializers.ModelSerializer):
    attempt_detail_id = serializers.IntegerField(required=False)
    q_type = serializers.ReadOnlyField(source='q.question_type',read_only=True)
# for essay name
    full_name = serializers.CharField(source='attempt.user.get_full_name',read_only=True)
    attempt_user = serializers.ReadOnlyField(source='attempt.user.id',read_only=True)

    attempt = serializers.PrimaryKeyRelatedField(read_only=True, required=False)
    explaination = serializers.SerializerMethodField()
    
    class Meta:
        model = models.User_Attempt_Detail
        fields = "__all__"
    def get_explaination(self, attempt_detail):
        all_choice = models.Exam_Choice.objects.filter(question_id=attempt_detail.q_id)
        for item in all_choice:
            if (item.choice == attempt_detail.choose_answer):
                return item.explaination
        
        

class ExamSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.get_full_name', required=False)
    start_date = serializers.DateTimeField(required=False, allow_null=True)
    end_date = serializers.DateTimeField(required=False, allow_null=True)
    subject = serializers.ReadOnlyField(source='topic.subject.subject_id',read_only=True,required=False)
    total_essay_answer = serializers.SerializerMethodField()
    
    class Meta:
        model = models.Exam
        fields = "__all__"

    def get_total_essay_answer(self, exam):
        return models.User_Attempt_Detail.objects.filter(examm=exam.exam_id,correct_answer="").count()

class AssignExamSerializer(serializers.ModelSerializer):
    assign_exam = ExamSerializer(read_only=True, required=False)
    full_name = serializers.CharField(source='user.get_full_name',read_only=True)
    class Meta:
        model = models.Assign_Exam
        fields = "__all__"
        

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = "__all__"

class Exam_ChoiceSerializer(serializers.ModelSerializer):
    choice_id = serializers.IntegerField(required=False)
    question = serializers.PrimaryKeyRelatedField(read_only=True, required=False)

    class Meta:
        
        model = models.Exam_Choice
        fields = "__all__"



class Exam_QuestionSerializer(serializers.ModelSerializer):
    choice = Exam_ChoiceSerializer(many=True, read_only=False)
    image = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = models.Exam_Question
        fields = "__all__"

    def create(self, validated_data):
        choice_data = validated_data.pop('choice')
        # print(choice_data)
        question = models.Exam_Question.objects.create(**validated_data)
        for choice in choice_data:
            models.Exam_Choice.objects.create(question=question, **choice)
        return question

    def update(self, instance, validated_data):
        choice_data = validated_data.get('choice')
        instance.question = validated_data.get('question', instance.question)
        instance.save()
        allchoice = []
        delete = []
        query = models.Exam_Choice.objects.filter(question_id=instance.question_id)
        for item in query:
            allchoice.append(item.choice_id)
        for choice in choice_data:
            choice_id = choice.get('choice_id', None)
            delete.append(choice_id)
        diff = list(set(allchoice) - set(delete))

        for i in diff:
            models.Exam_Choice.objects.filter(choice_id=i).delete()
        for item in choice_data:
            choice_id = item.get('choice_id', None)
            if (choice_id != None):
                choice_item = models.Exam_Choice.objects.get(choice_id=choice_id)
                choice_item.choice = item.get('choice', choice_item.choice)
                choice_item.correct_answer = item.get(
                    'correct_answer', choice_item.correct_answer)
                choice_item.explaination = item.get(
                    'explaination', choice_item.explaination)
                choice_item.save()

            elif (choice_id is None):

                if (item.get("choice_id") is None):
                    models.Exam_Choice.objects.create(
                        question=instance, **item)

        
        return instance

class User_AttemptSerializer(serializers.ModelSerializer):
    attempt_detail = User_Attempt_DetailSerializer(many=True, read_only=False)
    exam_title = serializers.ReadOnlyField(source='exam.title',read_only=True, required=False)
    full_name = serializers.ReadOnlyField(source='user.get_full_name',read_only=True,required=False)
    total_question = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    high_score = serializers.IntegerField(read_only=True, required=False)

    class Meta:
        model = models.User_Attempt
        fields = "__all__"
    
    def create(self, validated_data):
        # print(validated_data)
        attempt_data = validated_data.pop('attempt_detail')
        # print(attempt_data)
        attempt = models.User_Attempt.objects.create(**validated_data)
        # print(attempt)
        for detail in attempt_data:
            models.User_Attempt_Detail.objects.create(attempt=attempt, **detail)
        return attempt
    def get_total_question(self, attempt):
        exam = models.Exam.objects.get(exam_id=attempt.exam_id)
        # print(exam.is_random)
        if exam.is_random == True:
            return models.Exam.objects.get(exam_id=attempt.exam_id).show_question
        else:
            return models.Exam.objects.get(exam_id=attempt.exam_id).total_question

    def get_score(self, attempt):
        exam = models.Exam.objects.get(exam_id=attempt.exam_id)
        current_total_question = attempt.current_total_question
        score = (attempt.total_correct * 100) / current_total_question
        return score
        

class ExamHistorySerializer(serializers.ModelSerializer):
    attempt_detail = User_Attempt_DetailSerializer(many=True, read_only=False)
    exam_title = serializers.ReadOnlyField(source='exam.title',read_only=True)
    class Meta:
        model = models.User_Attempt
        fields = "__all__"

class LeaderBoardSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True, required=False)
    high_score = serializers.CharField(read_only=True, required=False)

        

