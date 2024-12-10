from ninja import ModelSchema, Schema
from .models import BacklogIssue, Team


class LoginSchema(Schema):
    username: str
    password: str


class UserSchema(Schema):
    id: int
    username: str


class TeamSchema(ModelSchema):
    class Config:
        model = Team
        model_fields = ["id", "name", "description"]


class BacklogIssueSchema(ModelSchema):
    team: TeamSchema

    class Config:
        model = BacklogIssue
        model_fields = [
            "id",
            "title",
            "description",
            "developer_clarity",
            "business_value_clarity",
            "customer_validation",
            "created_at",
            "updated_at",
        ]
