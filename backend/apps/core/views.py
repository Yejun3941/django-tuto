from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.cache import cache_page
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView


@cache_page(60)
@api_view(["GET"])
def hello_world(request):
    return Response({"message": "If Token access, you see this message!"})


class CookieTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # 1) 기존 로직으로 JWT 발급
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            data = response.data
            access = data.get("access")
            refresh = data.get("refresh")

            # Access Token 쿠키 설정
            response.set_cookie(
                "access_token",
                access,
                httponly=True,  # JavaScript에서 접근 불가
                secure=True,  # HTTPS에서만 전송
                samesite="Strict",  # CSRF 보호
                max_age=15 * 60,  # 15분 (settings.py의 ACCESS_TOKEN_LIFETIME과 동일)
                path="/",  # 모든 경로에서 사용 가능
            )

            # Refresh Token 쿠키 설정
            response.set_cookie(
                "refresh_token",
                refresh,
                httponly=True,
                secure=True,
                samesite="Strict",
                max_age=7
                * 24
                * 60
                * 60,  # 7일 (settings.py의 REFRESH_TOKEN_LIFETIME과 동일)
                path="/api/token/refresh/",  # path parameter의 의미 is what? path의 경로에서 사용가능 이라기엔 /api/token/refresh/ 했을경우, 해당 경로에서도 refresh token not found
            )

            # 토큰을 응답 본문에서 제거
            response.data = {"message": "Login successful"}

        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logout successful"})

        # 쿠키 삭제
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response
