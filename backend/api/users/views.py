from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, NewsletterSerializer, FAQSerializer
from .models import CustomUser, Newsletter, FAQ
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
import random
import re

def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except:
        UserModel.DoesNotExist
        return False

def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))

@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid paramenter only'})
    username = request.POST['email']
    password = request.POST['password']

    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username):
        return JsonResponse({'error': 'Niepoprawny email!'})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)

        if user.check_password(password):
            usr_dict = UserModel.objects.filter(
                email=username).values().first()
            usr_dict.pop('password')
            usr_dict.pop('session_token')
            usr_dict.pop('is_superuser')
            usr_dict.pop('is_staff')
            usr_dict.pop('is_active')
            usr_dict.pop('last_login')
            usr_dict.pop('updated_at')
            usr_dict.pop('created_at')


            if user.session_token == "0":
                token = generate_session_token()
                user.session_token = token
                user.save()
            else:
                token = user.session_token

            login(request, user)
            return JsonResponse({'token': token, 'user': usr_dict})
        else:
            return JsonResponse({'error': 'Niepoprawne hasło!'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Niepoprawny email!'})


def signout(request, id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid user ID'})

    return JsonResponse({'success': 'Logout success'})

class GetNewsletter(generics.ListAPIView):
    serializer_class = NewsletterSerializer
    
    def get_queryset(self):
        return Newsletter.objects.all()

class GetFAQ(generics.ListAPIView):
    serializer_class = FAQSerializer
    
    def get_queryset(self):
        return FAQ.objects.all()

@csrf_exempt
def newsletter_signup(request):
    if request.method == 'POST':
        email = request.body.decode('utf-8')

        if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", email):
            return JsonResponse({'error': 'Niepoprawny email!'})

        try:
            newsletter = Newsletter.objects.get(email=email)
            return JsonResponse({'error': 'Mail jest już zapisany w Newsletterze!'})

        except Newsletter.DoesNotExist:
            newsletter = Newsletter(email=email)
            newsletter.save()
            return JsonResponse({"success":"Dziękujemy za zapisanie się do Newslettera!"})  
        
    return JsonResponse({"error":"Niepoprawne rządanie!"})

class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]

        except KeyError:
            return [permission() for permission in self.permission_classes]

@csrf_exempt
def handle_newsletter(request, user_id, token):
    if validate_user_session(user_id, token):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(id=user_id)
            user.newsletter = not user.newsletter
            user.save()
            return JsonResponse({'success':"Zaktualizowano!", 'data':user.newsletter})

        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'Użytkownik nie istnieje!'})

    return JsonResponse({'error': 'Sesja nie istnieje!'})

@csrf_exempt
def delete_account(request, user_id, token):
    if validate_user_session(user_id, token):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(id=user_id)
            
            user.delete()
            return JsonResponse({'success':"Konto usunięte!"})

        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'Użytkownik nie istnieje!'})
        
    return JsonResponse({'error': 'Sesja nie istnieje!'})
