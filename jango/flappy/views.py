import json
from django.forms import model_to_dict
from django.http import JsonResponse
from .models import Week, FreePay, ChallengeTicket, LiveUsed, InBank

def get_current_week(request):
    week = Week.objects.last()
    return JsonResponse(model_to_dict(week))

def record_free_play(request):
    data_unicode = request.body.decode('utf-8')
    body = json.loads(data_unicode)
    FreePay.objects.create(walet_address = body.wallet)
    return JsonResponse({'success':True})

def record_challagen_ticket(request):
    data_unicode = request.body.decode('utf-8')
    body = json.loads(data_unicode)
    week = Week.objects.last()
    ChallengeTicket.objects.create(
        walet_address = body.get('wallet'),
        price= body.get('price'),
        nft_used=body.get('nftUsed'),
        week=week)
    in_bank = InBank.objects.get(week=week)
    in_bank.in_bank = in_bank + body.get('price')
    in_bank.save()
    return JsonResponse({'success':True})

def use_a_life(request):
    data_unicode = request.body.decode('utf-8')
    body = json.loads(data_unicode)
    week = LiveUsed.objects.create(
        walet_address = body.get('wallet'),
        nft_used = body.get('nftUsed'),
        price = body.get('price'),
    )
    in_bank = InBank.objects.get(week=week)
    in_bank.in_bank = in_bank + body.get('price')
    in_bank.save()
    return JsonResponse({'success':True})

def get_lives_used(request):
    data_unicode = request.body.decode('utf-8')
    body = json.loads(data_unicode)
    week = Week.objects.last()
    lives = LiveUsed.objects.get(walet_address = body.get('wallet'),nft_used = body.get('nftUsed'),week=week).count()
    return JsonResponse({'livesUsed':lives})

def get_in_bank(request):
    week = Week.objects.last()
    in_bank = InBank.objects.last(week=week)
    return JsonResponse({'inBank':in_bank.in_bank})
