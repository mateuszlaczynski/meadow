from unicodedata import name
from rest_framework import routers, urlpatterns
from django.urls import path, include
from .views import OrderViewSet, generate_bank_transfer_order

router = routers.DefaultRouter()
router.register(r'', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('new/generate-bank-transfer-order/', 
    generate_bank_transfer_order, name="generate-bank-transfer"),
]