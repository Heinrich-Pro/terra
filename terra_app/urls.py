from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Page d'accueil
    path('images/', views.images, name='images'),  # Page pour les images/données
]