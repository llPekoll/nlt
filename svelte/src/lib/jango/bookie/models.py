from django.db import models


class Trad(models.Model):

    key = models.CharField(max_length=32, unique=True)
    content = models.TextField()

    def __str__(self):
        return self.key


class Section(models.Model):
    name = models.CharField(max_length=32, unique=True, blank=True, null=True)

    def __str__(self):
        return self.name


class Match(models.Model):
    ticket_price = models.IntegerField(default=300)
    team1_name = models.CharField(max_length=63)
    team2_name = models.CharField(max_length=63)
    team1_wallet = models.CharField(max_length=63)
    team2_wallet = models.CharField(max_length=63)
    null_wallet = models.CharField(max_length=63)
    team1_cote = models.FloatField(default=1)
    team2_cote = models.FloatField(default=1)
    null_cote = models.FloatField(default=1)
    start_match_hour = models.DateTimeField()

    display_pourcentage = models.BooleanField(default=True)

    section = models.ForeignKey(
        Section, related_name="matchs", on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return f"{self.team1_name}_vs_{self.team2_name}"


class TicketCount(models.Model):
    bent_on_choices = (
        ("team1", "Team 1"),
        ("team2", "Team 2"),
        ("null", "Null"),
    )

    match = models.ForeignKey(
        Match, related_name="ticket_count", on_delete=models.CASCADE
    )
    address = models.CharField(max_length=63)
    amount = models.IntegerField(default=0)

    bent_on = models.CharField(max_length=6, choices=bent_on_choices, default="team1")
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.bent_on)
