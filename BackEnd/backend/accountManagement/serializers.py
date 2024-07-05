from rest_framework import serializers
from accountManagement.models import Account
from django.db import models

class AccountSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Account
        fields = '__all__'


class PendingAccountSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Account
        fields = ['account_number','account_type','status']