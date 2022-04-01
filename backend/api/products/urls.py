from rest_framework import routers, urlpatterns
from django.urls import path, include
from .views import (CarouselImageViewSet, CategoryViewSet, ProductViewSet, GetProductStock,
 add_item_to_cart, GetCartContent, ProductStockViewSet,
 check_cart_content, GetProductImages, GetRecommendedProducts,
 remove_item_from_cart, remove_one_from_cart, add_one_to_cart,
 contact_us, check_code, clear_cart)

router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'products-stock', ProductStockViewSet)
router.register(r'carousel-images', CarouselImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('products/stock/<int:product_id>/', GetProductStock.as_view(), name="get-product-stock"),
    path('products/images/<int:product_id>/', GetProductImages.as_view(), name="get-product-images"),
    path('add-to-cart/<int:user_id>/<str:token>/<int:product_id>/<int:amount>/',
        add_item_to_cart, name="add-to-cart"),
    path('remove/<int:user_id>/<str:token>/<int:product_id>/',
        remove_item_from_cart, name="remove-from-cart"),
    path('remove-one/<int:user_id>/<str:token>/<int:product_id>/',
        remove_one_from_cart, name="remove-one"),
    path('add-one/<int:user_id>/<str:token>/<int:product_id>/',
        add_one_to_cart, name="remove-one"),
    path('cart/<int:user_id>/', GetCartContent.as_view(), name="cart"),
    path('check-cart/<int:user_id>/', check_cart_content, name="check-cart"),
    path('check-code/<str:code>/', check_code, name="check-code"),
    path('recommended-products/<int:product_id>/', GetRecommendedProducts.as_view(), name="recommended-products"),
    path('contact-us/', contact_us, name="contact-us"),
    path('clear-cart/<int:user_id>/', clear_cart, name="clear-cart")
]