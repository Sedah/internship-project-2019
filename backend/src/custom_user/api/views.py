from .serializers import ProfileSerializer, ChangePasswordSerializer
from rest_framework import viewsets
from django.db.models import Count
from rest_auth.registration.views import RegisterView
from rest_auth.views import PasswordChangeView, LoginView
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from django.contrib.auth import (
    login as django_login,
    logout as django_logout
)
from rest_framework import serializers
from rest_framework.generics import CreateAPIView, GenericAPIView
from custom_user.api.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_auth.models import TokenModel
from django.conf import settings
from django.contrib.auth.models import User
from rest_auth.app_settings import (TokenSerializer, LoginSerializer,
                                    JWTSerializer,
                                    create_token)
from allauth.account.utils import complete_signup
from allauth.account import app_settings as allauth_settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_auth.utils import jwt_encode
from custom_user.models import Profile
sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters(
        'password', 'old_password', 'new_password1', 'new_password2'
    )
)
from pprint import pprint


class ProfileListView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    def update(self, request, *args, **kwargs):

        try:
            id = request.data['id']
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            email = request.data['email']
        except:
            id = None
            first_name = None
            last_name = None
            email = None
        test = self.queryset.get(pk=kwargs.get('pk'))
        print(test)
        if (id != None or first_name != None or last_name != None or email != None):
            User.objects.filter(id=id).update(first_name=first_name, last_name=last_name,email=email)
    
        return super(ProfileListView, self).update(request, *args, **kwargs)


class ProfileDetailListView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    

# select profile match with contact_id(Employee login)


class ProfileContactDetailView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(contact_id=self.kwargs['contact_id'])


class RegisterView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    token_model = TokenModel

    def dispatch(self, *args, **kwargs):
        return super(RegisterView, self).dispatch(*args, **kwargs)

    def get_response_data(self, user):
        if allauth_settings.EMAIL_VERIFICATION == \
                allauth_settings.EmailVerificationMethod.MANDATORY:
            return {"detail": _("Verification e-mail sent.")}

        if getattr(settings, 'REST_USE_JWT', False):
            data = {
                'user': user,
                'token': self.token
            }
            return JWTSerializer(data).data
        else:
            return TokenSerializer(user.auth_token).data

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        print(user)
        headers = self.get_success_headers(serializer.data)
        # print(user.id)  # output number (ex.21)
        user_obj = Profile.objects.get(id=user.id)
        # print(user_obj)  # output profile obj

        print(serializer)

        customize_body = {'id': user.id, 'firstname': user_obj.first_name,
                          'lastname': user_obj.last_name, 'role': user_obj.role, 'email': user_obj.email,
                          }
        customize_body.update(serializer.data)
        customize_body.update(self.get_response_data(user))
        print(customize_body)
        response = Response(customize_body, status=status.HTTP_201_CREATED)
        print(response)
        return response

    def perform_create(self, serializer):
        user = serializer.save(self.request)
        if getattr(settings, 'REST_USE_JWT', False):
            self.token = jwt_encode(user)
        else:
            create_token(self.token_model, user, serializer)

        complete_signup(self.request._request, user,
                        allauth_settings.EMAIL_VERIFICATION,
                        None)
        return user


class LoginView(GenericAPIView):
    """
    Check the credentials and return the REST Token
    if the credentials are valid and authenticated.
    Calls Django Auth login method to register User ID
    in Django session framework
    Accept the following POST parameters: username, password
    Return the REST Framework Token Object's key.
    """
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer
    token_model = TokenModel
    # print("Hello")

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        
        return super(LoginView, self).dispatch(*args, **kwargs)

    def process_login(self):
        django_login(self.request, self.user)
        

    def get_response_serializer(self):
        if getattr(settings, 'REST_USE_JWT', False):
            response_serializer = JWTSerializer
        else:
            response_serializer = TokenSerializer
        return response_serializer

    def login(self):
        self.user = self.serializer.validated_data['user']
        print(self.user)

        if getattr(settings, 'REST_USE_JWT', False):
            self.token = jwt_encode(self.user)
        else:
            self.token = create_token(self.token_model, self.user,
                                      self.serializer)

        if getattr(settings, 'REST_SESSION_LOGIN', True):
            self.process_login()

    def get_response(self):
        print("response",self)
        serializer_class = self.get_response_serializer()
        

        if getattr(settings, 'REST_USE_JWT', False):
            data = {
                'user': self.user,
                'token': self.token
            }
            serializer = serializer_class(instance=data,
                                          context={'request': self.request})
        else:
            serializer = serializer_class(instance=self.token,
                                          context={'request': self.request})
        print("response")
        user_obj = User.objects.get(username=self.user)
        profile_obj = Profile.objects.get(first_name=user_obj.first_name,last_name=user_obj.last_name)
        print(profile_obj)
        customize_body = {'firstname': user_obj.first_name, 'lastname': user_obj.last_name,
                          'role': profile_obj.role, 'email': profile_obj.email, 'user_id': user_obj.id}
                      
        customize_body.update(serializer.data)
        response = Response(customize_body, status=status.HTTP_200_OK)

        response = Response(serializer.data, status=status.HTTP_200_OK)
        if getattr(settings, 'REST_USE_JWT', False):
            from rest_framework_jwt.settings import api_settings as jwt_settings
            if jwt_settings.JWT_AUTH_COOKIE:
                from datetime import datetime
                expiration = (datetime.utcnow() +
                              jwt_settings.JWT_EXPIRATION_DELTA)
                response.set_cookie(jwt_settings.JWT_AUTH_COOKIE,
                                    self.token,
                                    expires=expiration,
                                    httponly=True)
        return response
    
    def post(self, request, *args, **kwargs):
        print("=========================================")
        print("self",self)
        print(request)
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data,
                                              context={'request': request})
        self.serializer.is_valid(raise_exception=True)

        self.login()
        return self.get_response()



class PasswordChangeView(generics.GenericAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (AllowAny,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
                # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response("Success.", status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
