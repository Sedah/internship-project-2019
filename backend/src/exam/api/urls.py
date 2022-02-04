from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'subject', views.SubjectListView, base_name='subject/'),
router.register(r'topic', views.TopicListView, base_name='topic/'),
router.register(r'exam', views.ExamListView, base_name='exam/'),
router.register(r'exam_question', views.Exam_QuestionListView, base_name='exam_question/'),
router.register(r'image', views.ImageListView, base_name='image/'),
router.register(r'exam_choice', views.Exam_ChoiceListView, base_name='exam_choice/'),
router.register(r'assign', views.AssignListView, base_name='assign/'),
router.register(r'user_attempt', views.User_AttemptListView, base_name='user_attempt/'),
router.register(r'user_attempt_detail', views.User_Attempt_DetailListView, base_name='user_attempt_detail/'),

urlpatterns=[
    path('', include(router.urls)),
# select all question in 1 exam for attempt
    path('exam/<int:exam_id>/question', views.Exam_ExamQuestionListView.as_view({'get': 'list'})),
# select all question in 1 exam for edit
    path('exam/<int:exam_id>/edit', views.QuestionListView.as_view({'get': 'list'})),
# select all exam that have essay answer
    path('marking/admin/', views.ExamEssayListView.as_view({'get': 'list'})),
# select all exam that have essay answer(for instructor)
    path('marking/instructor/<int:user_id>', views.ExamEssayListForInstructorView.as_view({'get': 'list'})),
# select all essay answer in 1 exam
    path('marking/exam/<int:exam_id>', views.AnsweredEssayListView.as_view({'get': 'list'})),
# select all attempt in 1 user
    path('history/attempt/<int:user_id>', views.AttemptHistoryListView.as_view({'get': 'list'})),
# select all exam in 1 user
    path('history/exam/<int:user_id>', views.ExamHistoryListView.as_view({'get': 'list'})),
# select all assign exam in 1 user
    path('private/assign/<int:user_id>', views.AssignExamListView.as_view({'get': 'list'})),
# select all public exam 
    path('public/<int:topic_id>', views.PublicExamListView.as_view({'get': 'list'})),
# select all private exam 
    path('private/', views.PrivateExamListView.as_view({'get': 'list'})),
# select top 10 for exam ranking
    path('leaderboard/<int:exam_id>', views.LeaderBoardListView.as_view({'get': 'list'})),
# select top 10 for subject ranking
    path('scoreboard/<int:subject_id>', views.SubjectLeaderBoardListView.as_view()),
    
    
]


#urlpatterns=router.urls 
