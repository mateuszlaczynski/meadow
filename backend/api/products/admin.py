from django.contrib import admin
from .models import (Category, Product,
 ProductImage, ProductStock, CartItem,
 Code, CarouselImages)

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductStock)
admin.site.register(CartItem)
admin.site.register(ProductImage)
admin.site.register(Code)
admin.site.register(CarouselImages)
