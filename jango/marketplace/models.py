from django.db import models

class AdminWallet(models.Model):
    address = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return f"{self.name}_{self.address}"

class NFT(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    tokenUri = models.CharField(max_length=255, default='')
    tokenId = models.IntegerField(default=1)
    price = models.IntegerField(default=1000)
    is_listed = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Attribute(models.Model):
    nft_property = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    nft = models.ForeignKey(NFT, related_name="attribute", on_delete=models.CASCADE)
    def __str__(self):
        return self.nft_property
    

class Collection(models.Model):
    name = models.CharField(max_length=255, unique=True)
    nft = models.OneToOneField(NFT, related_name="collection", on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)
    nft = models.ForeignKey(NFT, related_name="tags", on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    


class Trad(models.Model):

    key = models.CharField(max_length=32, unique=True)
    content = models.TextField()

    def __str__(self):
        return self.key