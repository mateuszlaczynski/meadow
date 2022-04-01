from statistics import mode
from rest_framework import serializers
from .models import (Category, Product, ProductImage,
ProductStock, Code, CartItem, CarouselImages)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "id", "active")

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'description', 'id' ,'price', 'discount_price','active', 'category', 'slug', 'image')

class ProductStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductStock
        fields = ('id', 'product', 'size', 'quantity')    

class ProductImageSerialzier(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id','reference_name', 'product', 'image')

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = ('code', 'owner', 'email', 'discount_factor', 'marketers_share')

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('id','name', 'user', 'product', 'amount', 'size', 'price', 'discount_price', 'thumbnail', 'slug')

class CarouselImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImages
        fields = ('id','reference_name', 'image')