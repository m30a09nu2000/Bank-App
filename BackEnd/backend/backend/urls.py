
from django.contrib import admin
from django.urls import path,include
from back.views import LoginView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', LoginView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('',include('back.urls')),
    path('',include('accountManagement.urls')),
    path('',include('transactionManagement.urls')),
   
]