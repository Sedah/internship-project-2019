from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from exam import views
from custom_user import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('exam.api.urls')),
    path('api-user/', include('custom_user.api.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
