
from django.db import models
from accountManagement.models import Account

class Transaction(models.Model):
    Transaction_Types =(
        ('credit','credit'),
        ('debit','debit'),
    )

    transaction_type=models.CharField(max_length=10,choices=Transaction_Types)
    accNum=models.ForeignKey(Account,on_delete=models.CASCADE)
    
    amount=models.DecimalField(max_digits=10,decimal_places=2)
    balance=models.DecimalField(max_digits=10,decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    