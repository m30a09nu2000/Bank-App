from rest_framework import serializers
from .models import User
from accountManagement.models import Account
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self,attr):
        print(attr)
        data=super().validate(attr)
        token = self.get_token(self.user)
        data['user_type'] = str(self.user.user_type)
        data['user_firstname'] = str(self.user.user_firstname)
        data['id'] = str(self.user.id)
        
        print(data)

        return(data)


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def validate_email(self, email):
        if not email:
            raise serializers.ValidationError("Email is required.")
        return email

    def validate_user_firstname(self, user_firstname):
        if not user_firstname:
            raise serializers.ValidationError("First name is required.")
        if any(char.isdigit() for char in user_firstname):
            raise serializers.ValidationError("make sure to use a valid name!")          
        return user_firstname

    def validate_user_lastname(self, user_lastname):
        if len(user_lastname) < 2:
            raise serializers.ValidationError("Last name should be at least 2 characters long.")
        if any(char.isdigit() for char in user_lastname):
            raise serializers.ValidationError("make sure to use a valid name!")  
        return user_lastname

    def validate_phone(self, phone):
        if phone and len(str(phone)) != 10:
            raise serializers.ValidationError("Phone number should be 10 digits long.")
        return phone
    
    def validate_address(user_address):
        if not user_address:
               raise serializers.ValidationError("address is required.")
        return user_address
    
   

  

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)

        if password is not None:
            user.set_password(password)
        else:
            raise serializers.ValidationError("Password is required.")
        user.save()
        return user



class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = ['user_firstname','user_lastname','email','user_address','phone']

    # def validate_email(self, email):
    #     if not email:
    #         raise serializers.ValidationError("Email is required.")
    #     return email

    # def validate_user_firstname(self, user_firstname):
    #     if not user_firstname:
    #         raise serializers.ValidationError("First name is required.")
    #     if any(char.isdigit() for char in user_firstname):
    #         raise serializers.ValidationError("make sure to use a valid name!")          
    #     return user_firstname

    # def validate_user_lastname(self, user_lastname):
    #     if len(user_lastname) < 2:
    #         raise serializers.ValidationError("Last name should be at least 2 characters long.")
    #     if any(char.isdigit() for char in user_lastname):
    #         raise serializers.ValidationError("make sure to use a valid name!")  
    #     return user_lastname

    # def validate_phone(self, phone):
    #     if phone and len(str(phone)) != 10:
    #         raise serializers.ValidationError("Phone number should be 10 digits long.")
    #     return phone
    
    # def validate_address(user_address):
    #     if not user_address:
    #            raise serializers.ValidationError("address is required.")
    #     return user_address

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User,Account

        fields = ['email']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = '__all__'