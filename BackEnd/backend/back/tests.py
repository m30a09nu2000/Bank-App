from django.test import TestCase

from rest_framework.test import APIRequestFactory
from .views import *
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import force_authenticate
from django.urls import reverse



User = get_user_model()

factory=APIRequestFactory()

class TestRegistrtion(TestCase):

    def test_valid_data(self):
        
        data={
             
                "user_firstname" : "kunju",
                "user_lastname" : "ps",
                "user_address" : "kochi",
                "phone" : 9876534210,
                "email" : "kunju@gmail.com",
                "password" : "kinju123",
                      
        }
        request=factory.post('register',data,format='json')
        view=UserRegistrationView.as_view()
        response=view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_invalid_data(self):
        
        data={
             
                "user_firstname" : "kunju",
                "user_lastname" : "ps",
                "user_address" : "kochi",
                "phone" : 9876534257510,
                "email" : "kunjugmail.com",
                "password" : "",  
           
            }
        
        request=factory.post('register',data,format='json')
        view=UserRegistrationView.as_view()
        response=view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_data(self):
        
        data={
             
                "user_firstname" : "",
                "user_lastname" : "",
                "user_address" : "",
                "phone" : 987653,
                "email" : "",
                "password" : "",  
           
            }
        
        request=factory.post('register',data,format='json')
        view=UserRegistrationView.as_view()
        response=view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class YourSerializerTestCase(TestCase):
    def test_email_validation(self):
        serializer = UserRegistrationSerializer()

        with self.assertRaises(serializers.ValidationError):
            serializer.validate_email("") 

        with self.assertRaises(serializers.ValidationError):
            serializer.validate_email(None)  

     

    def test_user_firstname_validation(self):
        serializer = UserRegistrationSerializer()

        with self.assertRaises(serializers.ValidationError):
            serializer.validate_user_firstname("")  

        with self.assertRaises(serializers.ValidationError):
            serializer.validate_user_firstname("123")  

       

    def test_user_lastname_validation(self):
        serializer = UserRegistrationSerializer()

        with self.assertRaises(serializers.ValidationError):
            serializer.validate_user_lastname("")  

        with self.assertRaises(serializers.ValidationError):
            serializer.validate_user_lastname("123")  


    def test_phone_validation(self):
        serializer = UserRegistrationSerializer()

        with self.assertRaises(serializers.ValidationError):
            serializer.validate_phone("12345") 

        with self.assertRaises(serializers.ValidationError):
            serializer.validate_phone("12345678901")  

      

    # def test_address_validation(self):
    #     serializer = UserRegistrationSerializer()

    #     with self.assertRaises(serializers.ValidationError):
    #         serializer.validate_address("")  # Test case for empty address

class TestDetails(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.manager = get_user_model().objects.create_user(email="manager@gmail.com",password="managerpassword",user_type='manager')
        self.manager_token = Token.objects.create(user=self.manager)
        self.staff = get_user_model().objects.create_user(email="staff@gmail.com",password="staffpassword",user_type='staff')
        self.staff_token = Token.objects.create(user=self.staff)
        self.customer = get_user_model().objects.create_user(email="customer@example.com", password="customer", user_type='customer')
        self.customer_token = Token.objects.create(user=self.customer)
        
        print(self.manager_token.key)
        print(self.staff_token.key)
    
    

        
    def test_staff_details(self):        
        
        
        request = self.factory.get('viewstaff')
        force_authenticate(request, user=self.manager, token=self.manager_token)
        response = StaffListView.as_view()(request)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


   

 
   

    def test_update_staff_details(self):

        self.staff = get_user_model().objects.create(phone=9876543210,email="customer@gmail.com")

        
        data = {
            'phone' : 8606325499,
            'email':"customer@gmail.com"
        }

        request = self.factory.patch('viewstaff',data,format='json')
        force_authenticate(request, user=self.manager)
        response = StaffListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.staff.refresh_from_db()
        self.assertEqual(self.staff.phone,data['phone'])


    def test_update_invlaid_staff_details(self):

        self.staff = get_user_model().objects.create(phone=9876543210,email="customer@gmail.com")

      
        data = {
            'phone' : 865499,
            'email':"customer@gmail.com"
        }

        request = self.factory.patch('viewstaff',data,format='json')
        force_authenticate(request, user=self.manager)
        response = StaffListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_update_unauthorize_staff_details(self):

        self.staff = get_user_model().objects.create(phone=9876543210,email="customer@gmail.com")

      
        data = {
            'phone' : 8654999810,
            'email':"customer@gmail.com"
        }

        request = self.factory.patch('viewstaff',data,format='json')
        force_authenticate(request, user=self.staff)
        response = StaffListView.as_view()(request)
        response.render()
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    
    def test_unauthenticate_staff_details(self):        
        
        request = self.factory.get('viewstaff')
        
        response = StaffListView.as_view()(request)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_customer_list_details(self):
        request = self.factory.get("customers")
        force_authenticate(request, user=self.staff)
        response = CustomerListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_customer_list_unauthorize_details(self):
       
        request = self.factory.get("customers")
        force_authenticate(request, user=self.customer)
        response = CustomerListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_customer_unauthenticate_list_details(self):
        request = self.factory.get("customers")
     
        response = CustomerListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_customer_update_details(self):
        
        self.customer = get_user_model().objects.create(user_firstname="rahul",email="customer@gmail.com")

       
        data = {
            'user_firstname': 'Rahul',
            'email':"customer@gmail.com"
            
        }
        request = self.factory.patch('viewcustomer/{email}', data, format='json')
        force_authenticate(request,user=self.manager)
        response = CustomerListView.as_view()(request)
       
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.customer.refresh_from_db()
        self.assertEqual(self.customer.user_firstname,data['user_firstname'])


    def test_customer_unauthorize_update_details(self):
        
        self.customer = get_user_model().objects.create(user_firstname="rahul",email="customer@gmail.com")

     
        data = {
            'user_firstname': 'Rahul',
            'email':"customer@gmail.com"
            
        }
        request = self.factory.patch('viewcustomer/{email}', data, format='json')
        force_authenticate(request,user=self.customer)
        response = CustomerListView.as_view()(request)
       
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    def test_patch_customer_field_not_found(self):

        self.customer = get_user_model().objects.create(user_type="customer",email="customer@gmail.com")
        
        data = {
            'user_type' : "staff",
            'email':"customer@gmail.com"
        }
        request=self.factory.patch('viewcustomer', data, format='json')
        force_authenticate(request,user=self.staff)
        response = CustomerListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
    
        

    
class StaffManagerPermissionTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.staff_user = get_user_model().objects.create_user(email="staff@example.com", password="staff", user_type='staff')
        self.manager_user = get_user_model().objects.create_user(email="manager@example.com", password="manager", user_type='manager')
        self.customer_user = get_user_model().objects.create_user(email="customer@example.com", password="customer", user_type='customer')

    def test_staff_manager_permission(self):
        staff_manager_permission = StaffManagerPermission()
        view = StaffListView.as_view()

        # Test staff user
        request = self.factory.get('viewstaff')
        request.user = self.staff_user
        force_authenticate(request, user=self.staff_user)
        self.assertTrue(staff_manager_permission.has_permission(request, None))