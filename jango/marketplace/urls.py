from django.urls import path
from .views import NFTListView, NFTPageView, TradView, NFTDetailView, GetPourcetnt

urlpatterns = [
    path("nfts", NFTListView.as_view()),
    path("trads", TradView.as_view()),
    path("mycom/<int:price>", GetPourcetnt.as_view()),
    path("nfts/<int:page>", NFTPageView.as_view()),
    path("nft/<int:tokenId>", NFTDetailView.as_view()),
]
