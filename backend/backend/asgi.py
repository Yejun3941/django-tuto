"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
import chat.routing  # posts 앱의 라우팅 모듈 추가

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),  # 기존 HTTP 프로토콜
        "websocket": AuthMiddlewareStack(URLRouter(chat.routing.websocket_urlpatterns)),
    }
)
