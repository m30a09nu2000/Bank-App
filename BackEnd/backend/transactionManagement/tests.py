from rest_framework.test import APIRequestFactory
from .views import *
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import force_authenticate
from django.test import TestCase

User = get_user_model()

factory=APIRequestFactory()

class TestTransaction(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.customer = get_user_model().objects.create_user(email="customer@gmail.com",password="customer",user_type='customer')
        self.token, _ = Token.objects.get_or_create(user=self.customer)
        self.staff = get_user_model().objects.create_user(email="staff@gmail.com",password="staff",user_type='staff')
        self.token, _ = Token.objects.get_or_create(user=self.staff)
     
   
    def test_valid_deposit(self):
            self.account = Account.objects.create(customerId=self.customer,balance=100,status='approved')
            
            data ={
                 'amount' : 4000
            }

            request = self.factory.post('deposit',data,format='json')
            force_authenticate(request, user=self.customer,token=self.token)
            response = DepositView.as_view()(request)
            print(response.data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.account.refresh_from_db()
            transaction = Transaction.objects.latest('timestamp')
            self.assertEqual(transaction.balance, self.account.balance)
            self.assertEqual(str(transaction.accNum),str(self.account.account_number))

           
            self.assertEqual(self.account.balance,4100)

    def test_deposit_view(self):

        self.account = Account.objects.create(
            customerId=self.customer,
            account_number='12345',
            status='approved'
        )
         
        request = self.factory.get('deposit')
        force_authenticate(request, user=self.customer,token=self.token)
        response = DepositView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['account_number'], '12345')

    def test_invalid_deposit_view(self):

        self.account = Account.objects.create(
            customerId=self.customer,
            account_number='12345',
            status='pending'
        )
         
        request = self.factory.get('deposit')
        force_authenticate(request, user=self.customer,token=self.token)
        response = DepositView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        
    def test_invalid_deposit_amount(self):
         
        data = { 
              'amount' : -1
         }

        request = self.factory.post('deposit',data,format='json')
        force_authenticate(request, user=self.customer,token=self.token)
        response = DepositView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_pending_account_deposit(self):
         
        self.account = Account.objects.create(customerId=self.customer,balance=100,status='pending')

        data = {
              'amount' : 2000
         }
        
        request = self.factory.post('deposit',data,format='json')
        force_authenticate(request, user=self.customer,token=self.token)
        response = DepositView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_withdraw_view(self):

        
         
        request = self.factory.get('withdraw')
        force_authenticate(request, user=self.customer,token=self.token)
        response = WithdrawalView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_withdraw_view(self):
         
        self.account = Account.objects.create(
            customerId=self.customer,
            account_number='12345',
            status='pending'
        )
        request = self.factory.get('withdraw')
        force_authenticate(request, user=self.customer,token=self.token)
        response = WithdrawalView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_withdrawal_invalid_amount(self):
          
        data = { 
              'amount' : -1
         }

        request = self.factory.post('withdraw',data,format='json')
        force_authenticate(request, user=self.customer,token=self.token)
        response = WithdrawalView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_insufficient_balance(self):

        self.account = Account.objects.create(customerId=self.customer,balance=1000,status='approved') 

        data = {
             'amount' : 2000
        }

        request = self.factory.post('withdraw',data,format='json')
        force_authenticate(request, user=self.customer,token=self.token)
        response = WithdrawalView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.account.refresh_from_db()
        self.assertEqual(self.account.balance,1000)


    def test_pending_account_withdraw(self):
         
        self.account = Account.objects.create(customerId=self.customer,balance=100,status='pending')

        data = {
              'amount' : 2000
         }
        
        request = self.factory.post('withdraw',data,format='json')
        force_authenticate(request, user=self.customer,token=self.token)
        response = WithdrawalView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    

    def test_valid_withdraw(self):
         
        self.account = Account.objects.create(customerId=self.customer,balance=1000,status='approved')
            
        data ={
                 'amount' : 500
            }

        request = self.factory.post('withdraw',data,format='json')
        force_authenticate(request, user=self.customer,token=self.token)
        response = WithdrawalView.as_view()(request)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.account.refresh_from_db()
        transaction = Transaction.objects.latest('timestamp')
        self.assertEqual(transaction.balance, self.account.balance)
        self.assertEqual(str(transaction.accNum),str(self.account.account_number))

           
        self.assertEqual(self.account.balance,500)

    
    def test_view_transaction(self):
        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
        
        params = {'data[account_number]': 12345}
        request = self.factory.get('staff',params)
        force_authenticate(request, user=self.staff,token=self.token)
        response = StaffManagerTransactionView.as_view()(request)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_view_unauthorize_transaction(self):
        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')

        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
        params = {'data[account_number]': 12345}
        request = self.factory.get('staff',params)
        force_authenticate(request, user=self.customer,token=self.customer)
        response = StaffManagerTransactionView.as_view()(request)
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_view_unauthenticate_transaction(self):


        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
        
        params = {'data[account_number]': 12345}
        request = self.factory.get('staff',params)

        response = StaffManagerTransactionView.as_view()(request)
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_view_invalid_transaction(self):
        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
        print(self.account.account_number)
        print(self.transaction.accNum)
        
        params = {'data[account_number]': 12}
        request = self.factory.get('staff',params)
        force_authenticate(request, user=self.staff,token=self.staff)
        response = StaffManagerTransactionView.as_view()(request)
        response.render()
        print(response.content)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


    def test_view_transaction_history(self):
        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
        params = {'data[account_number]': 12345}
        request = self.factory.get('download',params)
        force_authenticate(request, user=self.staff,token=self.staff)
        response = StaffManagerTransactionView.as_view()(request)
        
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_view_unauthorize_transaction_history(self):
        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
        params = {'data[account_number]': 12345}


        request = self.factory.get('download',params)
        force_authenticate(request, user=self.customer,token=self.customer)
        response = StaffManagerTransactionView.as_view()(request)
        
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    
    def test_download_customer_transaction_history(self):
        
        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
        params = {'data[account_number]': 12345}

        request = self.factory.get('download',params)
        force_authenticate(request, user=self.staff,token=self.staff)
        response = DownloadStaffManagerTransactionHistoryView.as_view()(request)
   
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.get('Content-Type'), 'text/csv')

    def test_download_customer_inavlid_transaction_history(self):
        
        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
        params = {'data[account_number]': 145}
        request = self.factory.get('download',params)
        force_authenticate(request, user=self.staff,token=self.staff)
        response = DownloadStaffManagerTransactionHistoryView.as_view()(request)
   
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_download_customer_unauthorize_transaction_history(self):
        
        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
        params = {'data[account_number]': 12345}

        request = self.factory.get('download',params)
        force_authenticate(request, user=self.customer,token=self.customer)
        response = DownloadStaffManagerTransactionHistoryView.as_view()(request)
   
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        

    
    def test_download_customer_transaction_history(self):

        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
     


        request = self.factory.get('download')
        force_authenticate(request, user=self.customer,token=self.customer)
        response = DownloadCustomerTransactionHistoryView.as_view()(request)
   
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.get('Content-Type'), 'text/csv')
        

    
    def test_download_customer_unaouthorize_transaction_history(self):

        self.account = Account.objects.create(customerId=self.customer,account_number=12345,balance=100,status='approved')
        self.transaction = Transaction.objects.create(accNum=self.account, amount=100, balance=100)
     


        request = self.factory.get('download')
        force_authenticate(request, user=self.staff,token=self.staff)
        response = DownloadCustomerTransactionHistoryView.as_view()(request)
   
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        
        


class DownloadStaffManagerTransactionHistoryViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = get_user_model().objects.create_user(
            email='manager@example.com',
            password='password123',
            user_type='manager'
        )
        self.account = Account.objects.create(
            customerId=self.user,
            account_number='12345',
            status='approved'
        )
        self.transaction = Transaction.objects.create(
            accNum=self.account,
            transaction_type='deposit',
            amount=500,
            balance=500,
            timestamp='2023-11-02T10:00:00Z'
        )


    def test_download_transaction_history(self):
       
        params = {'data[account_number]': 12345}
        request = self.factory.get(f'download',params)
        force_authenticate(request, user=self.user)
        response = DownloadStaffManagerTransactionHistoryView.as_view()(request)
        
  

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.get('Content-Type'), 'text/csv')
               
        