from django.test import TestCase
from django.contrib.auth import get_user_model
from shop.models import Product, Order, OrderItem

User = get_user_model()

class EcommerceModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='1234')
        self.product = Product.objects.create(name='Test Product', price=1000, stock=10)

    def test_order_create(self):
        order = Order.objects.create(user=self.user)
        item = OrderItem.objects.create(
            order=order,
            product=self.product,
            quantity=2,
            price=self.product.price * 2
        )
        # 총 주문 금액 갱신 로직 등 테스트
        order.total_amount = item.price
        order.save()
        self.assertEqual(order.total_amount, 2000)
