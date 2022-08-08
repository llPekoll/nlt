from configparser import SectionProxy
from django.contrib import admin

from .models import Match, Section, Trad, TicketCount


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    pass


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = [
        "__str__",
        "start_match_hour",
    ]
    search_fields = ["team1_name", "team2_name", "__str__"]


@admin.register(Trad)
class TradAdmin(admin.ModelAdmin):
    list_display = [
        "key",
        "content",
    ]
    search_fields = ["key", "content"]


@admin.register(TicketCount)
class TicketCountAdmin(admin.ModelAdmin):
    list_display = ["match", "bent_on", "address", "amount", "date"]
    search_fields = ["address"]
