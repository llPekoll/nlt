from django.contrib import admin
from .models import AdminWallet, NFT, Attribute, Trad, Collection, Tag

@admin.register(AdminWallet)
class AdminWalletAdmin(admin.ModelAdmin):
    list_display = [
        "address",
        "name",
    ]    

class AttributeInline(admin.TabularInline):
    model = Attribute

class CollectionInline(admin.TabularInline):
    # inlines = ['MyInlineAdmin']
    model = Collection

class TagInline(admin.TabularInline):
    # inlines = [MyInlineAdmin]
    model = Tag

@admin.register(NFT)
class NFTAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "description",
        "image",
        "price",
    ]   
    inlines = [
        AttributeInline,
        TagInline,
        CollectionInline
    ]


@admin.register(Trad)
class TradAdmin(admin.ModelAdmin):
    list_display = [
        "key",
        "content",
    ]
