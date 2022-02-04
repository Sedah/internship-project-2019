from django.db import models

from django.contrib.auth.models import User


class Profile(models.Model):
    
    models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    contact_id = models.IntegerField(null=True, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    email = models.CharField(max_length=255, unique=True)
    role = models.CharField(max_length=255, blank=True, default="Employee")
    created_on = models.DateTimeField(auto_now_add=True)
    update_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s: %s" % (str(self.first_name), self.last_name)
        

    # @receiver(post_save, sender=User)
    # def create_profile(sender, instance, created, **kwargs):
    #     if created:
    #         Profile.objects.create(user=instance)
    #         #output (instance=username, sender =  <class 'django.contrib.auth.models.User'>, created = True) 