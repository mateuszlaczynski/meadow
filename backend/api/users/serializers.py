from rest_framework import serializers
from .models import CustomUser, Newsletter, FAQ
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes, permission_classes

class UserSerializer(serializers.ModelSerializer):

    def create(self,validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    def update(self,instance,validated_data):
        for attr, value in validated_data.items():
            if attr == "password":
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        
        instance.save()
        return instance
    
    class Meta:
        model = CustomUser
        extra_kwargs = {'password':{'write_only': True}}
        fields = ('id', 'email', 'password', 'is_active','newsletter')

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ('email')

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ('question', 'answer')