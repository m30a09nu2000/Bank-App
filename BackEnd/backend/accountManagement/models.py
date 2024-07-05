from django.db import models
from django.contrib.auth.models import User
import random
from django.conf import settings
class Account(models.Model):
    accountType=(
     ('savings','savings'),
     ('current','current'),
     ('salary','salary')
    )

    customerId=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    account_number = models.CharField(max_length=10, primary_key=True, default=random.randint(100000,9999999))
    # email = models.CharField(max_length=200,unique=True, default=None)
    status = models.CharField(max_length=100,default='pending')
    balance=models.DecimalField(max_digits=10,decimal_places=2,default=0.0)
    account_type = models.CharField(max_length=20,default="",choices=accountType)

    def __str__(self):
       return str(self.account_number)