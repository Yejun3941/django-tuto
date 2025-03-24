from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  # HTTP 상태코드
from .serializers import UserCreateSerializer


class UserRegisterView(APIView):
    def post(self, request):  # POST 요청 처리
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )  # request 성공 시 front-end에 응답
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
