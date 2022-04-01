from ast import Or
from asyncio.windows_events import NULL
from cgitb import lookup
from hashlib import new
from itertools import product
from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Order
from api.products.models import Code
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist 
import json
from django.core.mail import send_mail
from django.conf import settings

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('created_at')
    serializer_class = OrderSerializer
    lookup_field = 'id'

@api_view(['POST'])
@permission_classes([AllowAny])
def generate_bank_transfer_order(request):
    if request.method == "POST":
        body = json.loads(request.body)

        first_name = body.get("firstName")
        last_name = body.get("lastName")
        full_name = f"{first_name} {last_name}"
        
        today = datetime.now()

        transaction_id= f'00{today.strftime("%S%M%H%d%m%y")}'
        
        code_base = body.get('code')
        try:
            code = Code.objects.get(code = code_base)
        except Code.DoesNotExist:
            code = None

        new_order = Order(email=body.get("email"), message=body.get("message"),
            city=body.get("city"), adress=body.get("adress"), postal_code=body.get("postalCode"),
            phone=body.get("phone"), full_name=full_name, product_names=body.get("cart"),
            shipment_fee=body.get("shipmentFee"), shipment_method=body.get("shipmentMethod"),
            transaction_id=transaction_id, total_price=body.get("price"), code=code)
        
        new_order.save()

        mail_content = f"Zamówienie od: {new_order.email} nr {new_order.transaction_id} \n {new_order.product_names} \n Uwagi: {new_order.message}"

        send_mail(
            f"Zamówienie {new_order.transaction_id}",
            mail_content,
            settings.EMAIL_HOST_USER,
            ["mateusz.laczynski20@gmail.com"],
            fail_silently=True,
        )

        return JsonResponse({"id":new_order.transaction_id,
            'price':new_order.total_price,
            "shipment_fee": new_order.shipment_fee})
