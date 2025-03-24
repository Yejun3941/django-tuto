from django.urls import re_path
from . import consumers

websocket_urlpatterns = [  # use asgi.py's URLRouter
    re_path(r"^ws/chat/$", consumers.ChatConsumer.as_asgi()),
]
