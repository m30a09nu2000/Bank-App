
from django.contrib import admin
from django.urls import path,include
from .views import *
urlpatterns = [
    path('register', UserRegistrationView.as_view()),
    path('viewstaff',StaffListView.as_view()),
  
    path('viewcustomer',CustomerListView.as_view()),
   
  
]
