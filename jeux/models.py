from django.db import models

class Score(models.Model):
    game_name = models.CharField(max_length=100)
    player_name = models.CharField(max_length=50)
    score = models.IntegerField()
    level = models.IntegerField(default=1)
    time_played = models.IntegerField(default=0)  # en secondes
    additional_data = models.JSONField(default=dict, blank=True)  # pour stocker des données spécifiques
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-score', '-date']
        verbose_name = "Score"
        verbose_name_plural = "Scores"

    def __str__(self):
        return f"{self.player_name} - {self.game_name}: {self.score}"