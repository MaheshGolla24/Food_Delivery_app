from django.urls import path
from .views import create_order, get_orders

urlpatterns = [
    path('create/', create_order),
    path('', get_orders),
]