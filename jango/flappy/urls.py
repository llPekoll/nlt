from django.urls import path
from .views import (
    WeekView,
    FreePayView,
    ChallengeTicketView,
    LivesView,
    HighestScoreView,
    CashInjectionView,
    UpdateScoreView,
)

urlpatterns = [
    path("week", WeekView.as_view()),
    path("freeplay", FreePayView.as_view()),
    path("ticket", ChallengeTicketView.as_view()),
    path("lives", LivesView.as_view()),
    path("highestscore", HighestScoreView.as_view()),
    path("updatescore", UpdateScoreView.as_view()),
    path("injectcash", CashInjectionView.as_view()),
]
