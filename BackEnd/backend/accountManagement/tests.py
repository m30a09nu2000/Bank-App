from django.test import TestCase

from rest_framework.test import APIRequestFactory
from .views import *
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import force_authenticate
from .permissions import *

User = get_user_model()

factory=APIRequestFactory()

class TestAcccountCreation(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.customer = get_user_model().objects.create_user(email="customer@gmail.com",password="customerpassword",user_type="customer")

        self.token, _ = Token.objects.get_or_create(user=self.customer)

        self.staff = get_user_model().objects.create_user(email="staff@gmail.com",password="staffpassword",user_type="staff")

        self.staff_token, _ = Token.objects.get_or_create(user=self.staff)

    def test_account_create(self):
     
        

        data={
             
             
                "account_type" : 'savings'
     
                        
        }
        request=factory.post('account',data,format='json')
      
       
        force_authenticate(request, user=self.customer, token=self.token)
        
      
        response = AccountCreateView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
       
    
    def test_unauthenticate_account_create(self):
     
        

        data={
             
             
                "account_type" : 'savings'
     
                        
        }
        request=factory.post('account',data,format='json')
      
       
        
        
      
        response = AccountCreateView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_unauthorize_account_create(self):
     
        

        data={
             
             
                "account_type" : 'savings'
     
                        
        }
        request=factory.post('account',data,format='json')
      
       
        
        
        force_authenticate(request, user=self.staff, token=self.staff_token)
        response = AccountCreateView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_missing_account_type(self):

        data={
             
             
                "account_type" : ''
     
                        
        }
        request=factory.post('account',data,format='json')
      
       
        force_authenticate(request, user=self.customer, token=self.token)
        response = AccountCreateView.as_view()(request)
    


        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    

    def test_account_create_invalid(self):

        data={
             
            
               "account_type" : ''
                
        }
        request=factory.post('account',data,format='json')
      
       
        force_authenticate(request, user=self.customer, token=self.token)
        response = AccountCreateView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_user_does_not_exist(self):

    #     customerId=10  
        
    #     data = {
    #         'account_type': 'savings'
    #     }
    #     request = self.factory.post('account', data, format='json')
    #     force_authenticate(request,user=self.user)  

    #     response = AccountCreateView.as_view()(request)
       

        # self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        

class PendingAccountTest(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
       
        self.staff = get_user_model().objects.create_user(email="staff@gmail.com",password="staffpassword",user_type='staff')
        self.staff_token = Token.objects.create(user=self.staff)

        self.customer = get_user_model().objects.create_user(email="customer@gmail.com",password="customerpassword",user_type='customer')
        self.customer_token = Token.objects.create(user=self.customer)
   
        print(self.staff_token.key)
    
    def test_pending_account(self):

        request=self.factory.get('pending')
      
       
        force_authenticate(request, user=self.staff, token=self.staff_token)
        response = StaffPendingAccountView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthorize_pending_account(self):

        request=self.factory.get('pending')
      
       
        force_authenticate(request, user=self.customer, token=self.customer_token)
        response = StaffPendingAccountView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_pending_unathenticate_account(self):

        request=self.factory.get('pending')
      
       
   
        response = StaffPendingAccountView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_pending_account_staff_unauthorize(self):

        request=self.factory.get('pending')
      
        response = StaffPendingAccountView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    
    def test_update_pending_invalid_account(self):

        self.account = Account.objects.create(customerId=self.customer,account_number=12345,status='pending')

        data = {
            'account_number' : 1234,
            'status' : 'approved'
        }

        request=self.factory.patch('pending',data,format='json')
      
       
        force_authenticate(request, user=self.staff, token=self.staff_token)
        response = StaffPendingAccountView.as_view()(request)
      
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_update_pending_account(self):
    
        self.account = Account.objects.create(customerId=self.customer,account_number=12345,status='pending')
        
        data = {
        'account_number' : 12345,
        'status' : 'approved'
        }

        request=self.factory.patch('pending',data,format='json')
      
       
        force_authenticate(request, user=self.staff, token=self.staff_token)
        response = StaffPendingAccountView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
        self.account.refresh_from_db()
        self.assertEqual(self.account.status,'approved')

    

    def test_account_close(self):

        self.account = Account.objects.create(customerId=self.customer,account_number=12345,status='approved')
       
         
        request=self.factory.post('close')
      
       
        force_authenticate(request, user=self.customer, token=self.customer_token)
        response = CloseAccount.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
        self.account.refresh_from_db()
        self.assertEqual(self.account.status,'closed')
   


class ViewAccountTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = get_user_model().objects.create_user(
            email="user@example.com",
            password="password123",
            user_type="customer"
        )
        self.account = Account.objects.create(
            customerId=self.user,
            account_number='12345',
            balance=100,
            status='approved',
            account_type='savings'
        )
        

    def test_view_account_authenticated_user(self):
        request = self.factory.get('viewaccount')
        force_authenticate(request, user=self.user)
        response = ViewAccount.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.user.email)
    
        