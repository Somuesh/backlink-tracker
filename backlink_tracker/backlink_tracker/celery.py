import os
from celery import Celery

# Set default Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backlink_tracker.settings")

# Create the Celery app instance
app = Celery("backlink_tracker")

# Load custom config from Django settings, namespace `CELERY`
app.config_from_object("django.conf:settings", namespace="CELERY")

# Auto-discover tasks from all registered Django apps
app.autodiscover_tasks()
