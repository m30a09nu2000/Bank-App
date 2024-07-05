from django.shortcuts import render
from .models import *
from accountManagement.models import Account
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status,viewsets
from django.http import HttpResponse
import csv
from .serializers import TransactionSerializer
from back.models import User
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import *

from datetime import datetime
global accNumber
accNumber = {}




class DepositView(APIView):
    permission_classes=[IsAuthenticated,CustomerTransactionPermisssion]
    def get(self,request):
        id=request.user.id
        try:
            account = Account.objects.get(customerId=id)
            

            accountNumber  = account.account_number
            if account.status == 'approved':
                return Response({

                    'account_number' : accountNumber
                     })
            else:
                 return Response("account not approved",status=status.HTTP_400_BAD_REQUEST)

        except Account.DoesNotExist:
            return Response("Account not  Available")
        
    
    def post(self,request):
        
        try:
            id=request.user.id
            transaction_type='deposit'
            amount=int(request.data.get('amount'))
            print(amount)
           
            if amount is not None and amount <= 0:
                raise serializers.ValidationError("Amount should greater than 0")
            else:

                account=Account.objects.get(customerId=id)
                accNum = account.account_number
            
                if account.status == 'pending' or account.status =='closed' or account.status=='rejected':
                    print("yes closed")
                    return Response("account is in pending or closed so not able to make transaction")
                else:
                    balance = account.balance
                    
                    
                
                    balance+=amount
                    print("balance :",balance)
                    account.balance=balance
                    account.save()
                    
                    transaction_data=Transaction(transaction_type=transaction_type,accNum=account,amount=amount,balance=balance)
                    transaction_data.save()
                    return Response("deposit succesfully")    
        #             except Transaction.DoesNotExist:
                        
        #                 balance=account.balance
        #                 balance+=amount
        #                 account.balance=balance
        #                 account.save()
        #             # accountBalance = Account(balance=balance)
        #             # accountBalance.save()
        #                 account_data=Transaction(transaction_type=transaction_type,accNum=accNum,amount=amount,balance=balance)
        #                 account_data.save()
        #                 return Response("deposit succesfully   ") 
        #             # return Response("not exist")      
        except Account.DoesNotExist:   
            return Response("")  
       

class WithdrawalView(APIView):
    
    permission_classes=[IsAuthenticated,CustomerTransactionPermisssion]
    
    def get(self,request):
        id=request.user.id
        try:
            account = Account.objects.get(customerId=id)

            accountNumber  = account.account_number
            if account.status == 'approved':
                return Response({

                    'account_number' : accountNumber
                     })
            else:
                return Response("Account is pending",status=status.HTTP_400_BAD_REQUEST)
        except Account.DoesNotExist:
            return Response("Not Available")
       
    


    def post(self,request):
      
        try:
            customerId=request.user.id
            print(customerId)
            transaction_type='withdraw'
            amount=int(request.data.get('amount'))
            if amount is not None and amount <= 0:
                raise serializers.ValidationError("Amount should be greater than 0")
            else:
          
                account=Account.objects.get(customerId=customerId)
                accNum = account.account_number
                if account.status == 'pending' or account.status == 'closed' or account.status=='rejected':
                    return Response("account is in pending or closed not able to make transaction")
                else:
                
                    balance=account.balance
                    if amount > balance:
                            return Response("Insufficient balance")
                    else:
                        print("balance :",balance)
                        balance-=amount
                        account.balance=balance
                        account.save()
                    # accountBalance = Account(balance=balance)
                    # accountBalance.save()
                        account_data=Transaction(transaction_type=transaction_type,accNum=account,amount=amount,balance=balance)
                        account_data.save()
                        return Response("withdrawal successfully",status=status.HTTP_200_OK)    
                  
                    
        except Account.DoesNotExist:   
            return Response("account not exist")
        

#Customer view Transaction History

class CustomerTransactionView(APIView):
    

    permission_classes=[IsAuthenticated,CustomerTransactionPermisssion]
    def get(self,request):
        
        
        
       
        try:
           
            customerId=request.user.id
            account=Account.objects.get(customerId=customerId)

            try:

                transaction = Transaction.objects.filter(accNum=account.account_number).order_by('-timestamp')
            
                print(transaction)
                
                   
                if len(transaction)==0:
                    return Response("Transaction not exist")
                else:

                        #pagination
                        
                    paginator = PageNumberPagination();
                    paginator.page_size = 10
                    paginated_transaction = paginator.paginate_queryset(transaction,request)


                    serializer = TransactionSerializer(paginated_transaction,many=True)
                    print("serializer data",serializer.data)

                    response_data = {
                            'count' : paginator.page.paginator.count,
                            'num_pages' : paginator.page.paginator.num_pages,
                            'current_page' : paginator.page.number,
                            'next_page' : paginator.get_next_link(),
                            'previous_page' : paginator.get_previous_link(),
                            'results' : serializer.data
                        }

                    print(response_data)             
                    return Response(response_data,status=status.HTTP_200_OK)
                        
            except Transaction.DoesNotExist:
                return Response("No Trasaction details available",status=status.HTTP_404_NOT_FOUND)
        except Account.DoesNotExist:
            return Response("Account not found",status=status.HTTP_404_NOT_FOUND)
     

#customer Transaction View Monthly
class CustomerTransactionMonthlyView(APIView):
    

    permission_classes=[IsAuthenticated,CustomerTransactionPermisssion]
    def get(self,request):
        

        inputMonth = int(request.query_params.get('data[month]'))
        print("month",inputMonth)
        
       
        try:
           
            customerId=request.user.id
            account=Account.objects.get(customerId=customerId)

            try:

                startofMonth = datetime(year=2023, month=inputMonth, day=1)
                endOfMonth = datetime(year=2023, month=inputMonth % 12 + 1, day=1)
                transaction = Transaction.objects.filter(accNum=account.account_number, timestamp__gte=startofMonth,timestamp__lt=endOfMonth).order_by('-timestamp')
            
                print(transaction)
                
                   
                if len(transaction)==0:
                    return Response("Transaction not exist")
                else:

                        #pagination
                        
                    paginator = PageNumberPagination();
                    paginator.page_size = 10
                    paginated_transaction = paginator.paginate_queryset(transaction,request)


                    serializer = TransactionSerializer(paginated_transaction,many=True)
                    print("serializer data",serializer.data)

                    response_data = {
                            'count' : paginator.page.paginator.count,
                            'num_pages' : paginator.page.paginator.num_pages,
                            'current_page' : paginator.page.number,
                            'next_page' : paginator.get_next_link(),
                            'previous_page' : paginator.get_previous_link(),
                            'results' : serializer.data
                        }

                    print(response_data)             
                    return Response(response_data,status=status.HTTP_200_OK)
                        
            except Transaction.DoesNotExist:
                return Response("No Trasaction details available",status=status.HTTP_404_NOT_FOUND)
        except Account.DoesNotExist:
            return Response("Account not found",status=status.HTTP_404_NOT_FOUND)
     



# View Transactions Manager and staff
class StaffManagerTransactionView(APIView):
    
    permission_classes=[IsAuthenticated,TransactionPermisssion]
    def get(self,request):

        accNum = request.query_params.get('data[account_number]')
        print(accNum)
       
        try:
          
            account=Account.objects.get(account_number=accNum)

            try:
                transaction = Transaction.objects.filter(accNum=accNum).order_by('-timestamp')
            
                print(transaction) 
               
                   
                if len(transaction)==0:
                    return Response("Transaction not exist")
                else:

                        #pagination
                        
                    paginator = PageNumberPagination();
                    paginator.page_size = 4
                    paginated_transaction = paginator.paginate_queryset(transaction,request)


                    serializer = TransactionSerializer(paginated_transaction,many=True)


                    response_data = {
                            'count' : paginator.page.paginator.count,
                            'num_pages' : paginator.page.paginator.num_pages,
                            'current_page' : paginator.page.number,
                            'next_page' : paginator.get_next_link(),
                            'previous_page' : paginator.get_previous_link(),
                            'results' : serializer.data
                        }

                    print(response_data)             
                    return Response(response_data,status=status.HTTP_200_OK)
                        
            except Transaction.DoesNotExist:
                return Response("No Trasaction details available",status=status.HTTP_404_NOT_FOUND)
        except Account.DoesNotExist:
            return Response("Account not found",status=status.HTTP_404_NOT_FOUND)
 
  
#Download Transaction History  for customer
class DownloadCustomerTransactionHistoryView(APIView):
    permission_classes=[IsAuthenticated,CustomerTransactionPermisssion]
    def get(self,request):
      
        id = request.user.id
        account=Account.objects.get(customerId=id)
        accNum=account.account_number
        try:
           
            transaction = Transaction.objects.filter(accNum=accNum).order_by('-timestamp')
            print(transaction)
            if len(transaction)==0:
                return Response("Transaction not exist")
            else:
                
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename = "transaction.csv"'

                csv_writer = csv.writer(response)
                csv_writer.writerow(['accNum','transaction_type','amount','balance','timestamp'])

                for transactiondata in transaction:
                    csv_writer.writerow([transactiondata.accNum,transactiondata.transaction_type,transactiondata.amount,transactiondata.balance,transactiondata.timestamp])

                return response
            
            
        except Transaction.DoesNotExist:
            return Response("Transaction not exist")
        
    
#customer can download transaction monthly
        
class DownloadCustomerTransactionHistoryMonthlyView(APIView):
    permission_classes=[IsAuthenticated,CustomerTransactionPermisssion]
    def get(self,request):
        inputMonth = int(request.query_params.get('data[month]'))
        id = request.user.id
        account=Account.objects.get(customerId=id)
        accNum=account.account_number
        try:
            startofMonth = datetime(year=2023, month=inputMonth, day=1)
            endOfMonth = datetime(year=2023, month=inputMonth % 12 + 1, day=1)
            transaction = Transaction.objects.filter(accNum=accNum,timestamp__gte=startofMonth,timestamp__lt=endOfMonth).order_by('-timestamp')
            print(transaction)
            if len(transaction)==0:
                return Response("Transaction not exist")
            else:
                
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename = "transaction.csv"'

                csv_writer = csv.writer(response)
                csv_writer.writerow(['accNum','transaction_type','amount','balance','timestamp'])

                for transactiondata in transaction:
                    csv_writer.writerow([transactiondata.accNum,transactiondata.transaction_type,transactiondata.amount,transactiondata.balance,transactiondata.timestamp])

                return response
            
            
        except Transaction.DoesNotExist:
            return Response("Transaction not exist")
        
    #Download Transaction History  both manager and staff
class DownloadStaffManagerTransactionHistoryView(APIView):
    permission_classes=[IsAuthenticated,TransactionPermisssion]
    def get(self,request):
        accNum = request.query_params.get('data[account_number]')
        print("account Number ",accNum)

        try:
            
            account=Account.objects.get(account_number=accNum)

        
            try:
                transaction = Transaction.objects.filter(accNum=accNum)
                print(transaction)
                if len(transaction)==0:
                    return Response("Transaction not exist")
                else:
                
                    response = HttpResponse(content_type='text/csv')
                    response['Content-Disposition'] = 'attachment; filename = "transaction.csv"'

                    csv_writer = csv.writer(response)
                    csv_writer.writerow(['accNum','transaction_type','amount','balance','timestamp'])

                    for transactiondata in transaction:
                        csv_writer.writerow([transactiondata.accNum,transactiondata.transaction_type,transactiondata.amount,transactiondata.balance,transactiondata.timestamp])

                    return response
            
            
            except Transaction.DoesNotExist:
                return Response("Transaction not exist")
        except Account.DoesNotExist:
                return Response("Account not exist",status=status.HTTP_404_NOT_FOUND)