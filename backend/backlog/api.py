from typing import List
from ninja import NinjaAPI, Schema
from ninja.security import django_auth
from django.shortcuts import get_object_or_404
from .models import BacklogIssue
from .schemas import BacklogIssueSchema

api = NinjaAPI(auth=django_auth)


@api.get("/issues", response=List[BacklogIssueSchema])
def list_issues(request):
    """
    List all backlog issues for teams that the authenticated user belongs to
    """
    user_teams = request.auth.teams.all()
    return BacklogIssue.objects.select_related("team").filter(team__in=user_teams)
