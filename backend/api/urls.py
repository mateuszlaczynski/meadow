from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('', include('api.products.urls')),
    path('users/', include('api.users.urls')),
    path('orders/', include('api.orders.urls')),
]