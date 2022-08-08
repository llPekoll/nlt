from django.forms import model_to_dict
from django.http import JsonResponse
from datetime import datetime
from django.db.models import Sum
import json

from .models import Match, Section, Trad, TicketCount


def get_match(request):
    matches = Match.objects.filter(start_match_hour__gte=datetime.now())
    matches_list = []
    for match in matches:
        m = model_to_dict(match)
        m['section'] = match.section.name if match.section else 'other'
        # m["start_match_hour"] = datetime.timestamp(m["start_match_hour"])
        tickets_all = TicketCount.objects.filter(match=match).aggregate(Sum("amount"))
        if tickets_all.get('amount__sum'):
            tickets1 = TicketCount.objects.filter(match=match, bent_on="team1").aggregate(
                Sum("amount")
            )
            if tickets1.get('amount__sum'):
                pourcent1 = tickets1["amount__sum"] * 100 / tickets_all["amount__sum"]
            else:
                pourcent1 = 0
            tickets2 = TicketCount.objects.filter(match=match, bent_on="team2").aggregate(
                Sum("amount")
            )
            if tickets2.get('amount__sum'):
                pourcent2 = tickets2["amount__sum"] * 100 / tickets_all["amount__sum"]
            else:
                pourcent2 = 0
            
            ticketsnull = TicketCount.objects.filter(match=match, bent_on="null").aggregate(
                Sum("amount")
            )
            if ticketsnull.get('amount__sum'):
                pourcentnull = ticketsnull["amount__sum"] * 100 / tickets_all["amount__sum"]
            else:
                pourcentnull = 0

            m["team1_pourcentage"] = f"{pourcent1:.2f}"
            m["team2_pourcentage"] = f"{pourcent2:.2f}"
            m["null_pourcentage"] = f"{pourcentnull:.2f}"
        else:
            m["team1_pourcentage"] = "0"
            m["team2_pourcentage"] = "0"
            m["null_pourcentage"] = "0"
            m["null_pourcentage"] = "0"
            m["display_pourcentage"] = False

        matches_list.append(m)
    sections = {match["section"] for match in matches_list}
    secs = {}
    for section in sections:
        matches = [match for match in matches_list if match["section"] == section]
        secs[section] = matches
    tot = []
    for k,v in secs.items():
        res ={
            'name': k,
            'content': v
        }
        tot.append(res)
    return JsonResponse({'sections':tot})


def get_trad(request):
    trads = Trad.objects.all()
    trads_dict = {trad.key: trad.content for trad in trads}
    return JsonResponse(trads_dict)


def post_ticket(request):
    if request.method == "POST":
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        print("data")
        print(data)
        match = Match.objects.get(pk=data.get('id'))
        bent_on = 'null'
        if data["wallet"] == match.team1_wallet:
            bent_on = "team1"
        if data["wallet"] == match.team2_wallet:
            bent_on = "team2"

        try:
            ticket = TicketCount.objects.create(
                match=match,
                address=data["wallet"],
                amount=data["amount"],
                bent_on=bent_on,
            )
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)})
        return JsonResponse({"id":ticket.id })

def get_ticket(request, pk):
    ticket = TicketCount.objects.get(pk=pk)
    ticket_dict = model_to_dict(ticket)
    ticket_dict['address'] = f"{ticket.address[:6]}....{ticket.address[-6:]}"
    match = Match.objects.get(pk=ticket.match.id)
    ticket_dict['team1'] = match.team1_name
    ticket_dict['team2'] = match.team2_name
    ticket_dict['winner'] = match.team1_name
    null_trad = Trad.objects.filter(key='null')
    if ticket.bent_on == 'null':
        ticket_dict['winner'] = null_trad[0].content
    if ticket.bent_on == 'team2':
        ticket_dict['winner'] = match.team2_name
    return JsonResponse(ticket_dict)