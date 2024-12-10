from typing import List
from ninja import NinjaAPI, Schema
from ninja.security import django_auth
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest
from .models import BacklogIssue
from .schemas import BacklogIssueSchema, LoginSchema, UserSchema

api = NinjaAPI(auth=django_auth, csrf=True)


@api.post("/login", response=UserSchema, auth=None)
def login_user(request: HttpRequest, data: LoginSchema):
    """
    Authenticate user with username and password
    """
    user = authenticate(username=data.username, password=data.password)
    if user is None:
        return api.create_response(
            request, {"detail": "Invalid credentials"}, status=401
        )

    login(request, user)
    return {"id": user.id, "username": user.username}


@api.post("/logout")
def logout_user(request):
    """
    Logout the current user
    """
    logout(request)
    return {"success": True}


@api.get("/me", response=UserSchema)
def get_current_user(request):
    """
    Get the current authenticated user
    """
    return {"id": request.user.id, "username": request.user.username}


@api.get("/issues", response=List[BacklogIssueSchema])
def list_issues(request):
    """
    List all backlog issues for teams that the authenticated user belongs to
    """
    user_teams = request.auth.teams.all()
    return BacklogIssue.objects.select_related("team").filter(team__in=user_teams)
