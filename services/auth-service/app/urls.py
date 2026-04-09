from django.urls import path
from .views import profile, register, login
urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('profile/', profile),
]