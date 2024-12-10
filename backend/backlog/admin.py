from django.contrib import admin
from .models import BacklogIssue


@admin.register(BacklogIssue)
class BacklogIssueAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "developer_clarity",
        "business_value_clarity",
        "customer_validation",
        "created_at",
    )
    list_filter = ("developer_clarity", "business_value_clarity", "customer_validation")
    search_fields = ("title", "description")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("title", "description")}),
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
