from django.contrib import admin
from django.urls import path
from bookie.views import get_match, get_trad, post_ticket, get_ticket
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("admin/", admin.site.urls),
    path("trads/", get_trad),
    path("match/", get_match),
    path("ticket/", csrf_exempt(post_ticket)),
    path("ticket/<int:pk>", csrf_exempt(get_ticket)),
]
