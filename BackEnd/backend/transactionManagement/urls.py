from django.urls import path,include
from .views import *

urlpatterns = [
    # path('deposit/<int:accNum>',DepositView.as_view()),
    path('deposit', DepositView.as_view()),
  
    path('withdraw', WithdrawalView.as_view()),
    path('viewtransaction',  CustomerTransactionView.as_view()),
    path('viewtransactionmonthly',  CustomerTransactionMonthlyView.as_view()),
    path('staffmanagertransaction', StaffManagerTransactionView.as_view()),
    path('download',DownloadCustomerTransactionHistoryView.as_view()),
    path('downloadmonthly',DownloadCustomerTransactionHistoryMonthlyView.as_view()),
    path('downloadtransaction',DownloadStaffManagerTransactionHistoryView.as_view()),
    # path('staff/download/<str:email>/<int:accNum>',StaffTransactionDownloadView.as_view()),
  
 
]