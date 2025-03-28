from rest_framework import serializers
from .models import Product, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "user", "total_amount", "status", "created_at", "items"]
        read_only_fields = ["user", "total_amount", "status", "created_at", "items"]

    def create(self, validated_data):
        # OrderItem 데이터 분리
        items_data = validated_data.pop("items", [])
        order = Order.objects.create(**validated_data)

        # OrderItem 생성
        total = 0
        for item_data in items_data:
            product = item_data["product"]
            quantity = item_data["quantity"]
            price = product.price * quantity  # 단순 가격 계산
            OrderItem.objects.create(
                order=order, product=product, quantity=quantity, price=price
            )
            total += price

        # 주문 총액 업데이트
        order.total_amount = total
        order.save()
        return order
