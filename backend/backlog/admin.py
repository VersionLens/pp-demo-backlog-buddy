from django.contrib import admin
from .models import BacklogIssue, Team


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("name", "get_member_count", "created_at")
    search_fields = ("name", "description")
    filter_horizontal = ("members",)
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("name", "description", "members")}),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def get_member_count(self, obj):
        return obj.members.count()

    get_member_count.short_description = "Members"


@admin.register(BacklogIssue)
class BacklogIssueAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "team",
        "developer_clarity",
        "business_value_clarity",
        "customer_validation",
        "created_at",
    )
    list_filter = (
        "team",
        "developer_clarity",
        "business_value_clarity",
        "customer_validation",
    )
    search_fields = ("title", "description", "team__name")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("title", "description", "team")}),
        (
            "Clarity Metrics",
            {
                "fields": (
                    "developer_clarity",
                    "business_value_clarity",
                    "customer_validation",
                )
            },
        ),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if not request.user.is_superuser:
            qs = qs.filter(team__members=request.user)
        return qs

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "team" and not request.user.is_superuser:
            kwargs["queryset"] = Team.objects.filter(members=request.user)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
