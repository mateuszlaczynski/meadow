from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("id",'user','email',
         'message', 'transaction_id', 'created_at',
         'city', 'adress', 'total_amount',
        'product_names', 'postal_code', 'phone',
        'full_name', 'shipment_fee', 'code',
        "total_price", 'shipped', 'accepted')
