from django.shortcuts import render
from .serializers import *
from .models import User
from rest_framework import status,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate

from rest_framework.permissions import IsAuthenticated

from .permissions import *
from django.contrib.auth import get_user_model

User = get_user_model()
    


#CreateAccount

class AccountCreateView(APIView):
    
  
    permission_classes=[IsAuthenticated,AccountPermission]
    def post(self, request):

        customerId = request.user.id
        print(customerId)
        
        # email = request.data.get('email')
        # if not email:
        #     raise serializers.ValidationError("email is required")
        # else:

        account_type = request.data.get('account_type')
        if not account_type or account_type !='savings' and account_type !='salary' and account_type !='current':
            raise serializers.ValidationError("account type is required")
        else:
        
            try:
                customer=User.objects.get(id=customerId)
                # emailcustomer = customer.email
                try: 
                    account =Account.objects.get(customerId=customer)
                    return Response("Account already exist",status=status.HTTP_400_BAD_REQUEST)
                except Account.DoesNotExist:
      
                    account = Account.objects.create(customerId=customer,account_type=account_type)
                    return Response("account created successfully")
          
            except User.DoesNotExist:
                return Response("User not found",status=status.HTTP_404_NOT_FOUND)
                      
        
           
      
       

#pending accounts list and update
       
class StaffPendingAccountView(APIView):
   
    permission_classes=[IsAuthenticated,StaffAccountPermission]
    def get(self, request,accNum=None):      
        pending_accounts = Account.objects.filter(status='pending')
        serializer = PendingAccountSerializer(pending_accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def patch(self, request):
        accNum=request.data.get('account_number')
        try:
            account = Account.objects.get(account_number=accNum)
            print(account)
            accStatus = request.data.get('status')
            if not accStatus or accStatus !='approved' and accStatus !='rejected':
                raise serializers.ValidationError("Invalid Status")
            else:
                account.status = accStatus
                account.save()
                serializer = PendingAccountSerializer(account)
                print("exist")
                return Response(serializer.data, status=status.HTTP_200_OK)
            # return Response(accNum)
        except Account.DoesNotExist:

            return Response("account not exist",status=status.HTTP_400_BAD_REQUEST)
           
                
#close account    
    
class CloseAccount(APIView):
    permission_classes=[IsAuthenticated,AccountPermission]
    def post(self, request):
        customerId=request.user.id
        try:
            account = Account.objects.get(customerId=customerId)
            if account.balance != 0.00:
                return Response("please withdraw money")
            else:
                
                print(account.status)
                if account.status != "closed":
                    account.status = "closed"
                    account.save()
                    return Response("Account Closed Successfully",status=status.HTTP_200_OK)
                else:
                  
                    return Response("Account is already closed",status=status.HTTP_400_BAD_REQUEST)
        
               
                      
        except Account.DoesNotExist:
            return Response({'message': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)

       
 
        
class ViewAccount(APIView):
    
    permission_classes=[IsAuthenticated,AccountPermission]
    def get(self, request):
        id=request.user.id
        
        try:
            
            user=User.objects.get(id=id)
            account = Account.objects.get(customerId=id)
            if account.status == 'pending':
               
                accNo = None
                accStatus = "inactive"
                balance = account.balance
                email = user.email
                accountType =account.account_type

                
            else:
                email = user.email
                accNo = account.account_number
                accStatus = account.status
                balance = account.balance
                accountType = account.account_type
        except Account.DoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({
            'email' : email,
            'account number':accNo,
            'status' : accStatus,
            'balance' : balance,
            'account_type' : accountType
        }, status=status.HTTP_200_OK)