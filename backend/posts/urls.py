from rest_framework.routers import DefaultRouter
from .views import PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

# router.urls = [
#     path('posts/', PostViewSet.as_view({'get': 'list', 'post': 'create'})),
#     path('posts/<int:pk>/', PostViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
# ] 
# 위의 코드를 router.register()로 대체

urlpatterns = router.urls
