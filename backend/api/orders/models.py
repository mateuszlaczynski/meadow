from django.db import models
from api.users.models import CustomUser
from django.core.validators import RegexValidator
from api.products.models import Code
from django.utils import timezone

class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, blank=True, null=True)
    message = models.TextField(max_length=1000, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=75, default='')
    adress = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=6)
    phone = models.CharField(max_length=9, validators=[RegexValidator(r'^\d{9}$/')])
    full_name = models.CharField(max_length=100)
    product_names = models.TextField(max_length=5000)
    shipment_fee = models.DecimalField(default=0, max_digits=12, decimal_places=2)
    shipment_method = models.CharField(blank=True, null=True, max_length=50)
    code = models.ForeignKey(Code, on_delete=models.SET_NULL, null=True)
    transaction_id = models.CharField(max_length=150, default=0)
    total_price = models.DecimalField(default=0, max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    accepted = models.BooleanField(default=False)
    shipped = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.email} : {self.transaction_id} | Data: {self.created_at}"
    
    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)