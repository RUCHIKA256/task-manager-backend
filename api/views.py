
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Google Calendar imports
from google.oauth2 import service_account
from googleapiclient.discovery import build
import os
import json


SCOPES = ["https://www.googleapis.com/auth/calendar"]


def get_google_calendar_service():
    """
    Creates and returns Google Calendar API service
    using service account credentials stored in env variable.
    """

    creds_json = os.getenv("GOOGLE_CREDENTIALS_JSON")

    if not creds_json:
        raise Exception("GOOGLE_CREDENTIALS_JSON environment variable not found!")

    creds_dict = json.loads(creds_json)

    credentials = service_account.Credentials.from_service_account_info(
        creds_dict,
        scopes=SCOPES
    )

    service = build("calendar", "v3", credentials=credentials)
    return service


def create_calendar_event(task):
    """
    Creates an all-day Google Calendar event based on Task due_date.
    """

    try:
        if not task.due_date:
            print("No due_date found, skipping calendar event.")
            return

        service = get_google_calendar_service()

        event = {
            "summary": task.title,
            "description": task.description or "",
            "start": {
                "date": task.due_date.strftime("%Y-%m-%d"),
                "timeZone": "Asia/Kolkata",
            },
            "end": {
                "date": task.due_date.strftime("%Y-%m-%d"),
                "timeZone": "Asia/Kolkata",
            },
        }

        # calendarId can be "primary" OR actual calendar email
        calendar_id = os.getenv("GOOGLE_CALENDAR_ID", "primary")

        created_event = service.events().insert(
            calendarId=calendar_id,
            body=event
        ).execute()

        print(" Google Calendar Event Created Successfully")
        print("Event ID:", created_event.get("id"))

    except Exception as e:
        print(" Google Calendar Error:", str(e))



#  TASK VIEWSET
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'priority', 'category']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'due_date']

    def perform_create(self, serializer):
        task = serializer.save()

        print("===================================")
        print("TASK CREATED:", task.title)
        print("DUE DATE:", task.due_date)
        print("===================================")

        # Google Calendar Event
        create_calendar_event(task)
