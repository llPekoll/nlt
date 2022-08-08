from django.db import models

# Create your models here.
class AdminWallet(models.Model):
    address = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.address

class NFT(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=255)
    image = models.FileField(upload_to="nft/img")
    mint_number = models.IntegerField(default=1)
    price = models.IntegerField(default=1000)

    def __str__(self):
        return self.name
    
class Attribute(models.Model):
    nft_property = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    nft = models.ForeignKey(NFT, related_name="attribute", on_delete=models.CASCADE)


class Trad(models.Model):

    key = models.CharField(max_length=32, unique=True)
    content = models.TextField()

    def __str__(self):
        return self.key