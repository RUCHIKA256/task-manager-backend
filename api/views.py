# from rest_framework import viewsets
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Google Calendar imports
from google.oauth2 import service_account
from googleapiclient.discovery import build
import os


def create_calendar_event(task):
    try:
        print("➡️ Inside create_calendar_event")

        # Go to backend folder (where manage.py is)
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        BASE_DIR = os.path.dirname(BASE_DIR)  # go up to backend

        credentials_path = os.path.join(BASE_DIR, 'credentials.json')

        print("Correct Credentials Path:", credentials_path)

        if not os.path.exists(credentials_path):
            print(" credentials.json NOT FOUND at:", credentials_path)
            return

        credentials = service_account.Credentials.from_service_account_file(
            credentials_path,
            scopes=['https://www.googleapis.com/auth/calendar']
        )

        service = build('calendar', 'v3', credentials=credentials)

        event = {
            'summary': task.title,
            'description': task.description,
            'start': {
                'date': task.due_date.strftime('%Y-%m-%d'),
                'timeZone': 'Asia/Kolkata',
            },
            'end': {
                'date': task.due_date.strftime('%Y-%m-%d'),
                'timeZone': 'Asia/Kolkata',
            },
        }

        service.events().insert(
            calendarId='ruchikakathuria00@gmail.com',
            body=event
        ).execute()

        print("Event successfully created in Google Calendar")

    except Exception as e:
        print(" Calendar Error:", str(e))



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

        if task.due_date:
            print("➡️ Calling Google Calendar function")
            create_calendar_event(task)
        else:
            print(" No due_date found — event not created")
