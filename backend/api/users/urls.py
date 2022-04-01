from rest_framework import routers, urlpatterns
from django.urls import path, include
from .views import (UserViewSet, signin, signout,
    handle_newsletter, delete_account, GetNewsletter,
    newsletter_signup, GetFAQ)

router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('login/', signin, name="signin"),
    path('logout/<int:id>/', signout, name="signout"),
    path('newsletter/', GetNewsletter.as_view(), name='newsletter-view'),
    path('newsletter/<int:user_id>/<str:token>/', handle_newsletter, name='newsletter'),
    path('newsletter/signup/', newsletter_signup, name='newsletter-signup'),
    path('faq/', GetFAQ.as_view(), name='faq'),
    path('delete/<int:user_id>/<str:token>/', delete_account, name='delete-account'),
    path('', include(router.urls))
]