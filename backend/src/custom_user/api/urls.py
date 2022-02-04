from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'profile', views.ProfileListView, base_name='profile/'),

urlpatterns=[
    path('', include(router.urls)),
# select profile match with contact_id(Employee login)
    path('profile/employee/<int:contact_id>', views.ProfileContactDetailView.as_view({'get': 'list'})),
    
    # 
    path('rest-auth/login/', views.LoginView.as_view()),
    path('rest-auth/registration/', views.RegisterView.as_view()),
    path('rest-auth/password/change/', views.PasswordChangeView.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
]

#urlpatterns=router.urls 
