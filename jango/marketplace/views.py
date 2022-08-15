from rest_framework.views import APIView
from .models import Trad, NFT
from django.http import JsonResponse



class NFTListView(APIView):
    #  https://api.example.org/accounts/?page=1
    def get(self, request):
        nft = NFT.objects.all()
        # add tag, category and attributes
        return JsonResponse(list(nft))

    def post(self, request):
        body = request.data
        # create NFT
        # if categoey add
        # if tag add
        # if attributes add
        return JsonResponse({'success':True})

class NFTDetailView(APIView):
    #  https://api.example.org/accounts/?page=1
    def get(self, request, tokenId):
        nft = NFT.objects.get(tokenId=tokenId)
        # add tag, category and attributes
        return JsonResponse(nft)

    def put(self, request, tokenId):
        body = request.data
        nft = NFT.objects.get(tokenId=tokenId)
        if body.get('price'):
            nft.price = body.get('price')
        if body.get('is_listed'):
            nft.is_listed = body.get('is_listed')
        nft.save()
        return JsonResponse({'success':True})

class CheckIfPaidView(APIView):
    def get(self, request):
        # => check on bscscan
        body = request.data
        body.get('payer_wallet')
        body.get('tx_id')
        return JsonResponse({'success':True})
        return JsonResponse({'success':False})


class TradView(APIView):
    
    def get(self, request):
        trads = Trad.objects.all()
        trads_dict = {trad.key: trad.content for trad in trads}
