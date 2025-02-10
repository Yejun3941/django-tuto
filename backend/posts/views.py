from rest_framework import viewsets, permissions
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all() # get 요청시 post 리스트 목록? 같은데 나중에 서비스 운영하면 페이지 네이션 구현 필요
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    # 비로그인시 get 만 가능

    def perform_create(self, serializer):
        # create 시 현재 로그인된 user를 author로 설정 
        serializer.save(author=self.request.user)