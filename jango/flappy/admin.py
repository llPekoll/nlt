from django.contrib import admin
from .models import Week, FreePay, ChallengeTicket, LiveUsed, HighestScore


@admin.register(Week)
class WeekAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = [
        "__str__",
        "number",
        "date",
        "in_bank",
    ]
    ordering = ["date"]
    search_fields = ["number"]
    readonly_fields = ["date", "number"]


@admin.register(FreePay)
class FreePayAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = [
        "__str__",
        "wallet",
    ]
    ordering = ["date"]
    search_fields = ["wallet", "week"]
    readonly_fields = ["date", "week"]


@admin.register(ChallengeTicket)
class ChallengeTicketAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = [
        "__str__",
        "price",
        "nft_used",
        "week",
    ]
    ordering = ["date"]
    search_fields = ["wallet"]
    readonly_fields = ["date"]


@admin.register(LiveUsed)
class LiveUsedAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = [
        "__str__",
        "price",
        "nft_used",
    ]
    ordering = ["date"]
    search_fields = ["wallet"]
    readonly_fields = ["date"]


@admin.register(HighestScore)
class HighestScoreAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ["__str__", "wallet", "score", "date"]
    ordering = ["date"]
    readonly_fields = ["date"]
