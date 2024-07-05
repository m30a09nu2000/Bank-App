from django.contrib import admin
from .models import User

class userAdmin(admin.ModelAdmin):
    list_display=['user_firstname','user_lastname','user_address','phone','email','user_type']
    list_filter=('user_type',)
    
    def get_queryset(self, request):
        queryset=super(userAdmin,self).get_queryset(request)
        queryset=queryset.filter(user_type='manager') | queryset.filter(user_type='staff')
        return queryset
    
admin.site.register(User,userAdmin)