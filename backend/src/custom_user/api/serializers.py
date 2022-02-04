from rest_framework import serializers
from custom_user.models import Profile
from rest_framework.fields import Field
from django.contrib.auth.models import User
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.models import TokenModel


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class UserSerializer(RegisterSerializer):
    id = serializers.IntegerField(required=False)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    contact_id = serializers.IntegerField(default=None)
    # role = serializers.ReadOnlyField(source='profile.role',read_only=True)
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = "__all__"

    def get_role(self, user):
        role = None
        try:
            profile_obj = Profile.objects.get(id=user.id)
            role = profile_obj.role
        except:
            role = "Guest"
        
        return role

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.save()
        # print("self>>>>",self) #output UserSerializer (data include)
        # print("request>>>>",request) #output request (ex. <rest_framework.request.Request object at 0x00000225B116FC18>)
        # print("user>>>>",user) #output username(str) (ex. test123)
        # print(user.id) # output int number(ex. 26)
        id = user.id
        contact_id = self.validated_data.get('contact_id', '')
        role = self.validated_data.get('role', 'Guest')
        email = self.validated_data.get('email', '')
        print(self.validated_data)
        Profile.objects.create(id=user.id,first_name=user.first_name,last_name=user.last_name,email=email, contact_id=contact_id, role=role)

class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key', 'user')      

class ChangePasswordSerializer(serializers.Serializer):

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

