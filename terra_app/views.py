from django.shortcuts import render

def home(request):
    context = {
        'title': "Anniversaire du Satellite Terra de la NASA",
        'description': (
            "Terra est le plus ancien satellite d'observation de la Terre de la NASA. Lancé en 1999, "
            "il a plus de 25 ans et cinq instruments fonctionnent en continu à bord du satellite. "
            "Terra accumule un peu de données au fil des ans (plus de 9 000 jours). "
            "Ses instruments incluent MODIS (imagerie multi-angle), CERES (nuages et énergie radiative), "
            "MISR (imagerie spectro-radiométrique), etc. Terra fournit des données sur le climat, "
            "l'environnement, les volcans, les feux, et plus."
        ),  # Basé sur tes captures d'écran
    }
    return render(request, 'home.html', context)

def images(request):
    context = {
        'title': "Images et Données de Terra",
        'images': [
            {'url': '/static/images/terra1.jpg', 'caption': 'Image du 24 août 2025 - Nuages sur une zone'},
            {'url': '/static/images/terra2.jpg', 'caption': 'Image du 24 août 2025 - Vue satellite'},
            {'url': '/static/images/terra3.jpg', 'caption': 'Image du 24 août 2025 - Données climatiques'},
        ],  # Ajoute tes images réelles dans static/images/
        'history': (
            "Le plus ancien satellite fonctionnant en permanence à bord d'un pupitre présent (image en même temps). "
            "Terra a potentiellement résolu les problèmes qu'affectionnent les humains. "
            "Voire de l'histoire unique de la Terre et maintenant l'accent sur les impacts pour vous, voire commune et/ou l'environnement."
        ),  # Extrait simplifié de tes captures
    }
    return render(request, 'images.html', context)