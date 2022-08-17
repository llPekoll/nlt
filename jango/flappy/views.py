import json
import datetime
from django.forms import model_to_dict
from django.http import JsonResponse
from .models import Week, FreePay, ChallengeTicket, LiveUsed, HighestScore
from rest_framework.views import APIView


def one_week_old(week):
    now = datetime.datetime.now()
    one_week_plus = week.date + datetime.timedelta(days=7)
    if one_week_plus > now:
        return True
    return False


def update_cash_prices(week, cash_added):
    week.first_bounty += cash_added * 0.5
    week.second_bounty += cash_added * 0.21
    week.third_bounty += cash_added * 0.09
    return week


class WeekView(APIView):
    def get(self, request):
        week = Week.objects.last()
        week_dict = model_to_dict(week)
        week_dict["free_play"] = FreePay.objects.filter(week=week).count()
        week_dict["challenge_ticket"] = ChallengeTicket.objects.filter(
            week=week
        ).count()
        week_dict["lives_used"] = LiveUsed.objects.filter(week=week).count()
        week_dict["nft_lives_used"] = LiveUsed.objects.filter(
            week=week, nft_used__gt=0
        ).count()
        return JsonResponse(week_dict)


class FreePayView(APIView):
    def post(self, request):
        body = request.data
        week = Week.objects.last()
        FreePay.objects.create(wallet=body.get("wallet"), week=week)
        return JsonResponse({"success": True})


class ChallengeTicketView(APIView):
    def post(self, request):
        body = request.data
        # stop add this after 7 days
        week = Week.objects.last()
        if one_week_old:
            return JsonResponse({"success": False, "error": "too old"})
        ChallengeTicket.objects.create(
            wallet=body.get("wallet"),
            price=body.get("price"),
            nft_used=body.get("nftUsed"),
            week=week,
        )
        week.in_bank += body.get("price")
        week = update_cash_prices(week, body.get("price"))
        # logic des scores

        week.save()

        return JsonResponse({"success": True})


class LivesView(APIView):

    # stop add this after 7 days
    def get(self, request):
        body = request.data
        week = Week.objects.last()
        lives = LiveUsed.objects.filter(
            wallet=body.get("wallet"), nft_used=body.get("nftUsed"), week=week
        )
        lives = [live for live in lives if live.date.day == datetime.datetime.now().day]
        return JsonResponse({"livesUsed": len(lives)})

    def post(self, request):
        body = request.data
        week = Week.objects.last()
        if one_week_old:
            return JsonResponse({"success": False, "error": "too old"})
        LiveUsed.objects.create(
            walet_address=body.get("wallet"),
            nft_used=body.get("nftUsed"),
            price=body.get("price"),
            week=week,
        )
        week.in_bank += body.get("price")
        week = update_cash_prices(week, body.get("price"))
        week.save()
        return JsonResponse({"success": True})


class HighestScoreView(APIView):
    def get(self, request):
        score = HighestScore.objects.last()
        return JsonResponse(model_to_dict(score))


class UpdateScoreView(APIView):
    def post(self, request):
        body = request.data
        week = Week.objects.last()
        if one_week_old:
            return JsonResponse({"success": False, "error": "too old"})
        if body.get("score") > week.first_score:
            week.first_score = body.get("score")
            week.first_wallet = body.get("wallet")
            week.save()
        elif body.get("score") > week.second_score:
            week.second_score = body.get("score")
            week.second_wallet = body.get("wallet")
            week.save()
        elif body.get("score") > week.third_score:
            week.third_score = body.get("score")
            week.third_wallet = body.get("wallet")
            week.save()
        higest_score = HighestScore.objects.first()
        if body.get("score") > higest_score.score:
            higest_score.wallet = body.get("wallet")
            higest_score.score = body.get("score")
            higest_score.is_challenge_mode = body.get("isChallengeMode")
            higest_score.date = datetime.datetime.now()
            higest_score.save()
        return JsonResponse(model_to_dict(week))


class CashInjectionView(APIView):
    def get(self, request):
        body = request.data
        week = Week.objects.last()
        week = update_cash_prices(week, body.get("cash"))
        week.in_bank += body.get("cash")
        week.save()
        return JsonResponse(model_to_dict(week))
