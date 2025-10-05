from django.urls import path
from . import views

urlpatterns = [
    path('', views.jeux_home, name='jeux_home'),  # Page principale listant tous les jeux
    path('quiz/', views.quiz_terra, name='quiz_terra'),
    path('trajectoire/', views.trajectoire_orbitale, name='trajectoire_orbitale'),
    path('puzzle/', views.puzzle_satellite, name='puzzle_satellite'),
    path('memory/', views.memory_spatial, name='memory_spatial'),
    path('debris/', views.chasseur_debris, name='chasseur_debris'),
    path('sauvegarder-score/', views.sauvegarder_score, name='sauvegarder_score'),
]