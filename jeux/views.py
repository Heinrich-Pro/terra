from django.shortcuts import render
from django.http import JsonResponse
from .models import Score

def jeux_home(request):
    context = {
        'title': 'Jeux Éducatifs et Interactifs sur le Satellite Terra',
        'games': [
            {'name': 'Quiz Satellite Terra', 'description': 'Un quiz interactif sur les faits du satellite Terra : sa mission, ses instruments (MODIS, ASTER, CERES, MISR), ses découvertes sur le climat. Points bonus pour les bonnes réponses rapides.', 'url': 'quiz_terra'},
            {'name': 'Trajectoire Orbitale', 'description': 'Le joueur doit tracer ou maintenir l\'orbite correcte de Terra autour de la Terre. Éviter les débris spatiaux tout en collectant des données scientifiques.', 'url': 'trajectoire_orbitale'},
            {'name': 'Puzzle d\'Images Satellitaires', 'description': 'Reconstituer des images célèbres capturées par Terra (éruptions volcaniques, ouragans, déforestation). Différents niveaux de difficulté.', 'url': 'puzzle_satellite'},
            {'name': 'Memory Spatial', 'description': 'Jeu de memory avec des paires d\'images : satellites et leurs missions, instruments scientifiques, phénomènes observés par Terra.', 'url': 'memory_spatial'},
            {'name': 'Chasseur de Débris Spatiaux', 'description': 'Protéger Terra en détruisant ou évitant les débris spatiaux qui s\'approchent. Style arcade simple avec score.', 'url': 'chasseur_debris'},
            {'name': 'Timeline Terra', 'description': 'Placer des événements majeurs de la mission Terra dans l\'ordre chronologique (lancement 1999, découvertes importantes, etc.).', 'url': '#'},
            {'name': 'Comparaison Avant/Après', 'description': 'Glisser un curseur pour comparer des images satellite de la même région à différentes époques, montrant les changements climatiques.', 'url': '#'},
            {'name': 'Mini-Simulateur d\'Observation', 'description': 'Pointer Terra vers différentes zones de la Terre pour "capturer" des phénomènes spécifiques (tempêtes, feux de forêt, etc.) dans un temps limité.', 'url': '#'},
        ]
    }
    return render(request, 'jeux/jeux_home.html', context)

def quiz_terra(request):
    context = {'title': 'Quiz Satellite Terra'}
    return render(request, 'jeux/quiz_terra.html', context)

def trajectoire_orbitale(request):
    context = {'title': 'Trajectoire Orbitale'}
    return render(request, 'jeux/trajectoire_orbitale.html', context)

def puzzle_satellite(request):
    context = {'title': 'Puzzle d\'Images Satellitaires'}
    return render(request, 'jeux/puzzle_satellite.html', context)

def memory_spatial(request):
    context = {'title': 'Memory Spatial'}
    return render(request, 'jeux/memory_spatial.html', context)

def chasseur_debris(request):
    context = {'title': 'Chasseur de Débris Spatiaux'}
    return render(request, 'jeux/chasseur_debris.html', context)

def sauvegarder_score(request):
    if request.method == 'POST':
        import json
        try:
            data = json.loads(request.body)
            
            # Validation des données
            score_value = data.get('score', 0)
            if not isinstance(score_value, (int, float)) or score_value < 0:
                return JsonResponse({'success': False, 'error': 'Score invalide'})
            
            # Créer un nouveau score
            score = Score.objects.create(
                game_name=data.get('type_jeu', 'unknown'),
                player_name=data.get('joueur', 'Anonyme')[:50],  # Limiter la longueur
                score=int(score_value),
                level=data.get('niveau', 1),
                time_played=data.get('temps', 0),
                additional_data={
                    'debris_detruits': data.get('debris_detruits', 0),
                    'combo_max': data.get('combo_max', 0),
                    'pairs_found': data.get('pairs_found', 0),
                    'questions_correct': data.get('questions_correct', 0)
                }
            )
            
            return JsonResponse({'success': True, 'id': score.id, 'rank': get_player_rank(score)})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Données JSON invalides'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False, 'error': 'Méthode non autorisée'})

def get_player_rank(score):
    """Calcule le rang du joueur pour ce jeu"""
    better_scores = Score.objects.filter(
        game_name=score.game_name,
        score__gt=score.score
    ).count()
    return better_scores + 1