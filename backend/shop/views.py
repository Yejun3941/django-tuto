from rest_framework import viewsets, permissions
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # isAuthenticatedOrReadOnly: 로그인 사용자는 상품 등록/수정 가능, 비로그인 사용자는 조회만
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # 주문 생성 시, 현재 로그인 사용자로 지정
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # 일반 사용자일 경우, 자신의 주문만 보이도록 제한
        # 관리자(superuser)는 전체 주문 볼 수 있다고 가정
        qs = super().get_queryset()
        if not self.request.user.is_superuser:
            qs = qs.filter(user=self.request.user)
        return qs
