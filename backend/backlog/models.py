from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class BacklogIssue(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    developer_clarity = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="How clear is this issue for developers? (1-5)",
    )
    business_value_clarity = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="How clear is the business value? (1-5)",
    )
    customer_validation = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="How validated is this with customers? (1-5)",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Backlog Issue"
        verbose_name_plural = "Backlog Issues"
