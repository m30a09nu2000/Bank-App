from django.contrib import admin
from django.urls import path,include
from .views import *
urlpatterns = [
   
    path('account', AccountCreateView.as_view()),
    
    path('pending', StaffPendingAccountView.as_view()),
    path('close', CloseAccount.as_view(),name='close account'),
    path('viewaccount', ViewAccount.as_view(),name='view account'),

    
    
]
