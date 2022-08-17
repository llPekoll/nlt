from django.db import models


class Week(models.Model):
    number = models.AutoField(primary_key=True)
    reception_wallet = models.CharField(
        max_length=64, default="0x3fe72C1280c7Ced7b0F3a054C59a23fbAbEa7077"
    )
    date = models.DateTimeField(auto_now=True)
    in_bank = models.IntegerField(default=325)
    first_wallet = models.CharField(max_length=64, default="0x0")
    first_bounty = models.CharField(max_length=64, default="0x0")
    first_bounty = models.IntegerField(default=200)
    first_score = models.IntegerField(default=0)
    first_date = models.DateTimeField(auto_now=True)
    second_wallet = models.CharField(max_length=64, default="0x0")
    second_bounty = models.IntegerField(default=100)
    second_score = models.IntegerField(default=0)
    second_date = models.DateTimeField(auto_now=True)
    third_wallet = models.CharField(max_length=64, default="0x0")
    third_bounty = models.IntegerField(default=25)
    third_score = models.IntegerField(default=0)
    third_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"week {self.number}"


class FreePay(models.Model):
    wallet = models.CharField(max_length=64)
    date = models.DateTimeField(auto_now=True)
    week = models.ForeignKey(Week, related_name="free_play", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.date}"


class ChallengeTicket(models.Model):
    wallet = models.CharField(max_length=64)
    price = models.IntegerField(default=300)
    nft_used = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now=True)
    week = models.ForeignKey(
        Week, related_name="challenge_ticket", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.week}, {self.date}, {self.wallet}"


class LiveUsed(models.Model):
    wallet = models.CharField(max_length=64)
    nft_used = models.IntegerField(default=0)
    price = models.IntegerField(default=300)
    date = models.DateTimeField(auto_now=True)
    week = models.ForeignKey(Week, related_name="live_used", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.week}, {self.date}, {self.wallet}"


class HighestScore(models.Model):
    wallet = models.CharField(max_length=64)
    score = models.IntegerField(default=1)
    date = models.DateTimeField(auto_now=True)
    is_challenge_mode = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.score} {self.date}"
