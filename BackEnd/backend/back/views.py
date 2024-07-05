from django.shortcuts import render
from .serializers import *
from .models import User
from rest_framework import status,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.permissions import IsAuthenticated

from .permissions import *
global customerlist
customerlist = {}



class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class UserRegistrationView(APIView):
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() 
            user.set_password(request.data['password'])
            user.save()
            return Response(
                'successfully registered',
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors)
    


#list staff details

class StaffListView(APIView):

    permission_classes=[IsAuthenticated,ManagerPermission]
    def get(self, request):
       
               
       
        staff = User.objects.filter(user_type='staff')
        paginator = PageNumberPagination();
        paginator.page_size = 1
        paginated_transaction = paginator.paginate_queryset(staff,request)


        serializer = UserListSerializer(paginated_transaction,many=True)
      


        response_data = {
                            'count' : paginator.page.paginator.count,
                            'num_pages' : paginator.page.paginator.num_pages,
                            'current_page' : paginator.page.number,
                            'next_page' : paginator.get_next_link(),
                            'previous_page' : paginator.get_previous_link(),
                            'results' : serializer.data
                        }
             
        return Response(response_data) 

        
   


    def patch(self,request):
        # customeremail = request.data.get('email')

        email=request.data.get('email')
        try:
            account = User.objects.get(email=email)
            print(account)
            serializer = UserRegistrationSerializer(account,data=request.data,partial=True)
            
            if serializer.is_valid():
                
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            print("exist")
            
            # return Response(accNum)
        except User.DoesNotExist:

            return Response("account not exist")
       
                
    
        
#list customer details
 
class CustomerListView(APIView):

    permission_classes=[IsAuthenticated,StaffManagerPermission]
   
    def get(self,request):     

    
          
        customers_data = User.objects.filter(user_type='customer')
        print(customers_data)
        serializer = UserSerializer(customers_data,many=True)
        for customersdata in customers_data:
                    
            email = customersdata.email
            user_firstname = customersdata.user_firstname
            user_lastname = customersdata.user_lastname
            user_address = customersdata.user_address
            customerId = customersdata.id
            
            phone = customersdata.phone
            print(email)
             
            accounts = Account.objects.filter(customerId=customerId)
            
            for accountsdata in accounts:
            
                accNum = accountsdata.account_number
                
             
                
                
                balance = accountsdata.balance
                accountstatus = accountsdata.status
                if accountstatus == 'approved':
                    accStatus = "active"
                else:
                    accStatus = 'inactive'
                    
                customerlist[accNum] = {'user_firstname':user_firstname,'user_lastname':user_lastname,'email':email,'phone':phone,'balance':balance,'user_address':user_address,'accountStatus':accStatus,'accountNumber':accNum}
        print(customerlist)
        customerList = list(customerlist.values())
        print(customerlist)
                  
        paginator = PageNumberPagination();
        paginator.page_size = 1
        paginated_list = paginator.paginate_queryset(customerList,request)
                # print(serializer.data)

                


        response_data = {
                            'count' : paginator.page.paginator.count,
                            'num_pages' : paginator.page.paginator.num_pages,
                            'current_page' : paginator.page.number,
                            'next_page' : paginator.get_next_link(),
                            'previous_page' : paginator.get_previous_link(),
                            'results' : paginated_list
                       }

        return Response(response_data)

           

     

           

    


           
           
      
    def patch(self,request):
        
        try:
            email=request.data.get('email')
            print("email is ",email)
            user = User.objects.get(email=email)
            fields_to_update=['user_firstname','user_lastname','user_address','phone']

            for field in fields_to_update:
                if field in request.data:
                    field=request.data[field]
                    print(field)
                else:
                    return Response("cant update this field", status=status.HTTP_404_NOT_FOUND)
                serializer = UserListSerializer(user, data  =request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                
                    return Response(serializer.errors)
        except User.DoesNotExist:
            return Response("user not found",status=status.HTTP_404_NOT_FOUND)
                
          
       
          