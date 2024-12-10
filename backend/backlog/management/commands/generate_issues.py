from django.core.management.base import BaseCommand
from django.utils import timezone
from backlog.models import BacklogIssue, Team
import random


class Command(BaseCommand):
    help = "Generates a specified number of realistic issues for a given team"

    REALISTIC_ISSUES = [
        (
            "Implement user authentication flow",
            "Create a secure authentication system including login, registration, and password reset functionality. Should support both email/password and OAuth providers.",
        ),
        (
            "Fix mobile responsive layout",
            "Several UI components are not properly aligned on mobile devices. Need to adjust flexbox layouts and implement proper breakpoints.",
        ),
        (
            "Optimize database queries",
            "Current database queries are causing performance issues. Need to implement proper indexing and optimize JOIN operations.",
        ),
        (
            "Add error boundary components",
            "Implement React error boundaries to gracefully handle and log frontend errors without crashing the application.",
        ),
        (
            "Setup automated testing pipeline",
            "Configure CI/CD pipeline with automated testing, including unit tests, integration tests, and end-to-end testing.",
        ),
        (
            "Implement caching layer",
            "Add Redis caching layer to improve application performance for frequently accessed data.",
        ),
        (
            "Update dependencies",
            "Several packages are outdated and have security vulnerabilities. Need to update and test compatibility.",
        ),
        (
            "Implement dark mode",
            "Add system-wide dark mode support using Tailwind CSS and persist user preferences.",
        ),
        (
            "Fix memory leak in dashboard",
            "Dashboard component is not properly cleaning up event listeners, causing memory leaks in long-running sessions.",
        ),
        (
            "Add input validation",
            "Implement proper input validation and sanitization for all user inputs to prevent XSS attacks.",
        ),
        (
            "Optimize image loading",
            "Implement lazy loading and proper image optimization to improve page load times.",
        ),
        (
            "Setup logging system",
            "Implement comprehensive logging system with different log levels and proper rotation policies.",
        ),
        (
            "Add export functionality",
            "Allow users to export data in various formats (CSV, PDF, Excel) with proper formatting.",
        ),
        (
            "Implement rate limiting",
            "Add rate limiting to API endpoints to prevent abuse and ensure fair usage.",
        ),
        (
            "Fix CORS issues",
            "Resolve cross-origin resource sharing issues affecting API communication.",
        ),
        (
            "Add progress tracking",
            "Implement progress tracking feature for long-running operations with proper status updates.",
        ),
        (
            "Optimize bundle size",
            "Reduce JavaScript bundle size by implementing code splitting and lazy loading.",
        ),
        (
            "Implement websockets",
            "Add real-time updates using WebSocket connections for live data updates.",
        ),
        (
            "Fix accessibility issues",
            "Improve accessibility by adding proper ARIA labels and keyboard navigation.",
        ),
        (
            "Add data backup system",
            "Implement automated backup system for critical data with proper retention policies.",
        ),
        (
            "Implement search functionality",
            "Add full-text search capability with proper indexing and relevance scoring.",
        ),
        (
            "Fix form validation UX",
            "Improve form validation UX with clear error messages and visual indicators.",
        ),
        (
            "Add API documentation",
            "Create comprehensive API documentation using Swagger/OpenAPI specification.",
        ),
        (
            "Implement file upload",
            "Add secure file upload functionality with proper validation and virus scanning.",
        ),
        (
            "Fix session handling",
            "Resolve issues with session management and implement proper timeout handling.",
        ),
        (
            "Add audit logging",
            "Implement audit logging for sensitive operations with proper user tracking.",
        ),
        (
            "Optimize API responses",
            "Implement proper API response caching and compression to improve performance.",
        ),
        (
            "Fix data race conditions",
            "Resolve concurrent data access issues causing race conditions.",
        ),
        (
            "Add password policies",
            "Implement secure password policies with proper validation and enforcement.",
        ),
        (
            "Fix SSL configuration",
            "Update SSL configuration to follow security best practices.",
        ),
        (
            "Implement user roles",
            "Add role-based access control with proper permission management.",
        ),
        (
            "Fix database deadlocks",
            "Resolve database deadlock issues in high-concurrency scenarios.",
        ),
        (
            "Add email notifications",
            "Implement email notification system with proper templating and scheduling.",
        ),
        ("Fix memory usage", "Optimize memory usage in data processing operations."),
        (
            "Implement data encryption",
            "Add proper data encryption for sensitive information at rest and in transit.",
        ),
        (
            "Fix build process",
            "Optimize build process to reduce compilation time and improve efficiency.",
        ),
        (
            "Add monitoring system",
            "Implement system monitoring with proper alerting and metrics collection.",
        ),
        (
            "Fix data inconsistency",
            "Resolve data synchronization issues causing inconsistent states.",
        ),
        (
            "Implement backup queue",
            "Add fallback queue system for handling failed operations.",
        ),
        (
            "Fix performance bottleneck",
            "Identify and resolve performance bottleneck in data processing pipeline.",
        ),
        (
            "Add automated backups",
            "Implement automated backup system with proper verification.",
        ),
        (
            "Fix security vulnerabilities",
            "Address identified security vulnerabilities in dependencies.",
        ),
        (
            "Implement API versioning",
            "Add proper API versioning support with backward compatibility.",
        ),
        (
            "Fix data migration issues",
            "Resolve issues with data migration scripts and improve reliability.",
        ),
        (
            "Add error tracking",
            "Implement error tracking system with proper categorization and reporting.",
        ),
        (
            "Fix cache invalidation",
            "Resolve cache invalidation issues causing stale data.",
        ),
        ("Implement SSO", "Add Single Sign-On support for enterprise customers."),
        (
            "Fix resource leaks",
            "Identify and fix resource leaks in long-running processes.",
        ),
        (
            "Add load balancing",
            "Implement proper load balancing for high availability.",
        ),
        (
            "Fix data validation",
            "Improve data validation logic to prevent invalid states.",
        ),
    ]

    def add_arguments(self, parser):
        parser.add_argument("team_id", type=int, help="Team ID to create issues for")
        parser.add_argument(
            "--number",
            type=int,
            default=50,
            help="Number of issues to generate (default: 50)",
        )

    def handle(self, *args, **options):
        try:
            team = Team.objects.get(id=options["team_id"])
        except Team.DoesNotExist:
            self.stderr.write(
                self.style.ERROR(f'Team with ID {options["team_id"]} does not exist')
            )
            return

        num_issues = options["number"]
        if num_issues <= 0:
            self.stderr.write(
                self.style.ERROR("Number of issues must be greater than 0")
            )
            return

        created_count = 0
        for _ in range(num_issues):
            title, description = random.choice(self.REALISTIC_ISSUES)

            # Add some randomization to make issues more unique
            if random.random() < 0.3:  # 30% chance to add a component prefix
                components = [
                    "Frontend",
                    "Backend",
                    "Database",
                    "API",
                    "UI",
                    "Security",
                ]
                title = f"[{random.choice(components)}] {title}"

            # Create the issue
            BacklogIssue.objects.create(
                title=title,
                description=description,
                team=team,
                developer_clarity=random.choice(range(1, 6)),
                business_value_clarity=random.choice(range(1, 6)),
                customer_validation=random.choice(range(1, 6)),
            )
            created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully created {created_count} issues for team {team.name}"
            )
        )
