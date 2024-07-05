from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password) 
        user.save(using=self._db)
        return user
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
  
    usertype = (
        ('staff','staff'),
        ('manager','manager')
    )
    username = None
    user_firstname = models.CharField(max_length=50)
    user_lastname = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.BigIntegerField(null=True, blank=True)
   
    user_address = models.CharField(max_length=255, default='')
   
    user_type = models.CharField(max_length=30, default='customer',choices=usertype)
    #user_status = models.CharField(max_length=50,default='pending')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_firstname']

    def __str__(self):
       return self.user_firstname
    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('bcrypt_sha256$'):
            self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)
