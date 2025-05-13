from django.urls import path
from .views import hello_world, CookieTokenObtainPairView, LogoutView

urlpatterns = [
    path("hello/", hello_world, name="hello"),
    path("token/", CookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/logout/", LogoutView.as_view(), name="token_logout"),
]
