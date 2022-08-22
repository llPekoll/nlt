from rest_framework.views import APIView
from .models import Attribute, Collection, Tag, Trad, NFT, Permanent
from django.http import JsonResponse
from django.forms import model_to_dict
from django.core.paginator import Paginator


class NFTPageView(APIView):
    def get(self, request, page):
        data = request.data
        nfts =''
        if not data:
            nfts = NFT.objects.filter(is_active=True)
        else:
            nfts = NFT.objects.exclude(is_active=True, owner=data.address)
            nfts2 = NFT.objects.exclude(is_active=True, creator=data.address)
            nfts = (nfts | nfts2).order_by('pk')
        p = Paginator(nfts, 10)
        page = p.page(page)
        nfts_list = []
        for nft in page.object_list:
            res = model_to_dict(nft)
            res["tags"] = [tag.name for tag in nft.tags.all()]
            if nft.collection:
                res["collection"] = nft.collection.name
            nfts_list.append(res)

        return JsonResponse(
            {
                "number_of_pages": p.num_pages,
                "total_entry": len(nfts),
                "first_entry": page.start_index(),
                "last_entry": page.end_index(),
                "nfts": nfts_list,
            }
        )
    # same function as  above!!!! fix dat!
    def post(self, request, page):
        data = request.data
        print(data['address'])
        nfts = NFT.objects.filter(is_active=True, owner=data['address'])
        nfts2 = NFT.objects.filter(is_active=True, creator=data['address'].lower())
        nfts =  nfts2 | nfts
        p = Paginator(nfts, 10)
        page = p.page(page)
        nfts_list = []
        for nft in page.object_list:
            res = model_to_dict(nft)
            res["tags"] = [tag.name for tag in nft.tags.all()]
            if nft.collection:
                res["collection"] = nft.collection.name
            nfts_list.append(res)

        return JsonResponse(
            {
                "number_of_pages": p.num_pages,
                "total_entry": len(nfts),
                "first_entry": page.start_index(),
                "last_entry": page.end_index(),
                "nfts": nfts_list,
            }
        )


class NFTListView(APIView):

    def post(self, request):
        body = request.data

        nft = NFT.objects.create(
            creator=body.get("creator").lower(),
            owner=body.get("creator").lower(),
            name=body.get("name"),
            description=body.get("description"),
            image=body.get("image"),
            tokenUri=body.get("tokenUri"),
            tokenId=body.get("tokenId"),
            price=body.get("price"),
            is_hidden=body.get("isHidden"),
            is_listed=True
        )
        if body.get("attributes"):
            print("attributes")
            print(body.get("attributes"))
            for attribute in body.get("attributes"):
                dict_value = attribute.items()
                Attribute.objects.create(
                    nft_property=list(dict_value)[0][1],
                    value=list(dict_value)[1][1],
                    nft=nft,
                )
        if body.get("collection"):
            try:
                Collection.objects.create(name=body.get("collection"))
                nft.collection = col
                nft.save()
            except Exception as e:
                col = Collection.objects.get(name=body.get("collection"))
                nft.collection = col
                nft.save()

        if body.get("tags"):
            for tag in body.get("tags"):
                tag = tag.strip().lower()
                if len(tag) > 0:
                    try:
                        tag = Tag.objects.create(name=tag)
                        nft.tags.add(tag)
                        nft.save()
                    except Exception as e:
                        tag = Tag.objects.get(name=tag)
                        nft.tags.add(tag)
                        nft.save()
                        print("Tag already created")

        return JsonResponse({"success": True})


class NFTDetailView(APIView):

    def get(self, request, tokenId):
        print('willmase')
        nft = NFT.objects.get(tokenId=tokenId)
        nft_dict = model_to_dict(nft)
        nft_dict["tags"] = [tag.name for tag in nft.tags.all()]
        nft_dict["attributes"] = [
            {"trait_type": attr.nft_property, "value": attr.value}
            for attr in Attribute.objects.filter(nft=nft)
        ]

        if nft.collection:
            nft_dict["collection"] = nft.collection.name
        print(nft_dict)
        return JsonResponse(nft_dict)

    def put(self, request, tokenId):
        body = request.data
        nft = NFT.objects.get(tokenId=tokenId)
        print("req")
        print(body)
        if "price" in body:
            nft.price = body.get("price")
        if "is_hidden" in body:
            print("is_hidden")
            nft.is_hidden = body.get("is_hidden")
        if "isListed" in body:
            print("isListed")
            nft.is_listed = body.get("is_listed")
        if "owner" in body:
            print("owner")
            print(body.get("owner").lower())
            nft.owner = body.get("owner").lower()
        nft.save()
        return JsonResponse({"success": True})


class CheckIfPaidView(APIView):
    def get(self, request):
        # => check on bscscan
        # => need to make the transfer here! ??? Questionnable
        body = request.data
        body.get("payer_wallet")
        body.get("tx_id")
        return JsonResponse({"success": True})
        return JsonResponse({"success": False})


class TradView(APIView):
    def get(self, request):
        trads = Trad.objects.all()
        trads_dict = {trad.key: trad.content for trad in trads}
        return JsonResponse(trads_dict, status=200)


class CollectionView(APIView):
    def get(self, request, name):
        try:
            Collection.objects.get(name=name)
            return JsonResponse({"error": {"message": "Already in basy"}}, status=409)
        except Collection.DoesNotExist:
            return JsonResponse({"success": True}, status=200)

class GetPourcetnt(APIView):
    def get(self, request, price):
        per = Permanent.objects.first()
        nftl_real_price = per.nftl_value / per.divided_by
        price_item_in_nftl = price * nftl_real_price
        
        pourcent_item_in_nftl = (price_item_in_nftl *per.commission_on_nft_in_bnb)
        
        in_bnb = (pourcent_item_in_nftl/ per.bnb_value)/2
        return JsonResponse({"value":f'{in_bnb:.16f}'})
    