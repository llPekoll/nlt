from django.db import models


class AdminWallet(models.Model):
    address = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return f"{self.name}_{self.address}"


class Permanent(models.Model):
    commission_on_nft_in_bnb = models.IntegerField(default=3) # in %
    nftl_value = models.IntegerField(default=3)
    divided_by = models.IntegerField(default=3)
    bnb_value = models.IntegerField(default=3)

class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Collection(models.Model):
    name = models.CharField(max_length=255, unique=True)
    # not_for_resell = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class NFT(models.Model):
    creator = models.CharField(max_length=64, default="0x") 
    owner = models.CharField(max_length=64, default="0x")
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    tokenUri = models.CharField(max_length=255, default="")
    tokenId = models.IntegerField(default=1)
    price = models.IntegerField(default=1000)
    is_hidden = models.BooleanField(default=False)
    is_listed = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag,blank=True, null=True)
    collection = models.ForeignKey(
        Collection, related_name="nfts", on_delete=models.CASCADE, blank=True, null=True
    )
    verified = models.BooleanField(default=False)
    # in case of Hack!
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Attribute(models.Model):
    nft_property = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    nft = models.ForeignKey(NFT, related_name="attribute", on_delete=models.CASCADE)

    def __str__(self):
        return self.nft_property


class Trad(models.Model):

    key = models.CharField(max_length=32, unique=True)
    content = models.TextField()

    def __str__(self):
        return self.key
