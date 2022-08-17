from django.contrib import admin
from .models import AdminWallet, NFT, Attribute, Trad, Collection, Tag, Permanent


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


@admin.register(Tag)
class TagInline(admin.ModelAdmin):
    pass

@admin.register(Permanent)
class PermanentAdmin(admin.ModelAdmin):
    pass


@admin.register(NFT)
class NFTAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "description", "image", "price", "collection"]
    filter_horizontal = ("tags",)
    inlines = [
        AttributeInline,
        # TagInline,
        # CollectionInline
    ]


@admin.register(Trad)
class TradAdmin(admin.ModelAdmin):
    list_display = [
        "key",
        "content",
    ]
