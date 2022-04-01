from django.contrib import admin
from .models import CustomUser, Newsletter, FAQ

admin.site.register(CustomUser)
admin.site.register(Newsletter)
admin.site.register(FAQ)