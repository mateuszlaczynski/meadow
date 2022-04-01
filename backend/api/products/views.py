from email import message
from rest_framework import viewsets, generics
from .serializers import (CategorySerializer, ProductSerializer, CodeSerializer,
ProductImageSerialzier ,CartItemSerializer, ProductStockSerializer,
CarouselImageSerializer)
from .models import (CartItem, Category, Code, Product,
ProductStock, ProductImage, CarouselImages)
from django.http import HttpResponse, JsonResponse
from api.users.views import validate_user_session
from .models import CustomUser
from django.views.decorators.csrf import csrf_exempt
from random import sample
from django.core.exceptions import ObjectDoesNotExist 
from django.core.mail import send_mail
from django.conf import settings

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(active=True).order_by('name')
    serializer_class = ProductSerializer
    lookup_field = 'slug'

class ProductStockViewSet(viewsets.ModelViewSet):
    queryset = ProductStock.objects.all()
    serializer_class = ProductStockSerializer

class CarouselImageViewSet(viewsets.ModelViewSet):
    queryset = CarouselImages.objects.all()
    serializer_class = CarouselImageSerializer

class GetProductStock(generics.ListAPIView):
    serializer_class = ProductStockSerializer
    
    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductStock.objects.filter(product=product_id)

class GetProductImages(generics.ListAPIView):
    serializer_class = ProductImageSerialzier
    
    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductImage.objects.filter(product=product_id)

def check_existing_id(list,number):
        for i in range(len(list)):
            if list[i] == number:
                return False
        return True

class GetRecommendedProducts(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        id_list = list(Product.objects.exclude(
            id=self.kwargs['product_id']
        ).values_list('id', flat=True))
        return Product.objects.filter(id__in=sample(id_list, 4))

@csrf_exempt
def add_item_to_cart(request, user_id, token, product_id, amount):
    if validate_user_session(user_id, token):
        user = CustomUser.objects.get(id=user_id)
        product = ProductStock.objects.get(id=product_id)

        if product.quantity < amount:
            return JsonResponse({'error':"Próbujesz zapisać więcej niż możesz!"})

        try:
            cart_item = CartItem.objects.get(user=user, product=product)
            updated_amount = cart_item.amount + amount
            if updated_amount > product.quantity:
                cart_item.save(amount=product.quantity)
                return JsonResponse({'success':"Produkt zaktualizowany!"})
            else:
                cart_item.amount = updated_amount
                cart_item.save()
                return JsonResponse({'success':"Produkt zaktualizowany!"})
        
        except ObjectDoesNotExist:
            cart_item = CartItem(user=user, product=product, amount=amount,
            size=product.size)
            cart_item.save()
            return JsonResponse({'success':"Zapisano produkt!"})
        
    else:
        return JsonResponse({'error':"Musisz być zalogowany aby wykonać tę akcję!"})

@csrf_exempt
def remove_item_from_cart(request, user_id, token, product_id):
    if validate_user_session(user_id,token):
        try:
            item = CartItem.objects.get(id=product_id)
            item.delete()
            return JsonResponse({'success':"Produkt został usunięty!"})
        except:
            return JsonResponse({'error':"Produkt nie istnieje!"})

    return JsonResponse({'error':"Musisz być zalogowany aby wykonać tę akcję!"})

class GetCartContent(generics.ListAPIView):
    serializer_class = CartItemSerializer
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return CartItem.objects.filter(user=user_id)

def check_cart_content(request,user_id):
    cart = CartItem.objects.filter(user=user_id)

    for item in cart:
        product_stock = ProductStock.objects.get(id=item.product.id, size=item.size)
            
        if item.amount > product_stock.quantity:
            item.amount = product_stock.quantity

        item.discount_price = product_stock.product.discount_price

        product = Product.objects.get(id=item.product.product.id)
        if item.price != product.price:
            item.price = product.price
        item.save()

    return JsonResponse({'success': 'Cart checked'})

def remove_one_from_cart(request, user_id, token, product_id):
    if validate_user_session(user_id, token):
        product = CartItem.objects.get(id=product_id)
        if product.amount > 1:
            product.amount -= 1
            product.save()
            return JsonResponse({'success':"Amount decreased!"})
        return JsonResponse({'error':"Unable to decrease anymore!"})
    return JsonResponse({'error':"You need to be logged in!"})

def add_one_to_cart(request, user_id, token, product_id):
    if validate_user_session(user_id, token):
        product = CartItem.objects.get(id=product_id)
        stock = ProductStock.objects.get(id=product.product.id)
        if product.amount < stock.quantity:
            product.amount += 1
            product.save()
            return JsonResponse({'success':"Amount increased!"})
        return JsonResponse({'error':"Unable to increase anymore!"})
    return JsonResponse({'error':"You need to be logged in!"})

@csrf_exempt
def contact_us(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')

        send_mail(
            "Pytanie z meadow.com.pl",
            body_unicode,
            settings.EMAIL_HOST_USER,
            ['mateusz.laczynski20@gmail.com'],
            fail_silently=True,
        )
        return JsonResponse({'success':"Email has been sent!"})

def check_code(request, code):
    try:
        checked_code = Code.objects.get(code=code)
        return JsonResponse({'success':checked_code.discount_factor})
    except ObjectDoesNotExist:
        return JsonResponse({'error':True})

def clear_cart(request, user_id):
    CartItem.objects.filter(user=user_id).delete()
    return JsonResponse({'sucess':"Cart cleared!"})