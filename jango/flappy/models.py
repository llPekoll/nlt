from django.db import models


class Week(models.Model):
    number = models.IntegerField(default=1)
    in_bank = models.IntegerField(default=300)
    first_wallet = models.CharField(max_length=32)
    first_score = models.IntegerField(default=1)
    first_date = models.IntegerField(auto_now=True)
    second_wallet = models.CharField(max_length=32)
    second_score = models.IntegerField(default=1)
    second_date = models.IntegerField(auto_now=True)
    third_wallet = models.CharField(max_length=32)
    third_score = models.IntegerField(default=1)
    third_date = models.IntegerField(auto_now=True)

class FreePay(models.Model):
    walet_address = models.CharField(max_length=32)
    date = models.DateTimeField(auto_now=True)

class ChallengeTicket(models.Model):
    walet_address = models.CharField(max_length=32)
    price = models.IntegerField(default=300)
    nft_used = models.IntegerField(default=1)
    date = models.DateTimeField(auto_now=True)
    week = models.ForeignKey(Week,"week", on_delete=models.CASCADE)

class LiveUsed(models.Model):
    walet_address = models.CharField(max_length=32)
    nft_used = models.IntegerField(default=1)
    price = models.IntegerField(default=300)
    date = models.DateTimeField(auto_now=True)
    week = models.ForeignKey(Week,"week", on_delete=models.CASCADE)

class HighestScore(models.Model):
    walet_address = models.CharField(max_length=32)
    score = models.IntegerField(default=1)
    date = models.IntegerField(auto_now=True)
    is_challenge_mode = models.BooleanField(default=False)

class InBank(models.Model):
    week = models.ForeignKey(Week,"week", on_delete=models.CASCADE)
    in_bank = models.IntegerField(default=700)
