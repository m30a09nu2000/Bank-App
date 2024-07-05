from rest_framework import permissions

class TransactionPermisssion(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.user_type in ['staff','manager']
    
class CustomerTransactionPermisssion(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.user_type in ['customer']