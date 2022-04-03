from django.db import models
from django.template.defaultfilters import slugify
from api.users.models import CustomUser

class Category(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(blank=True, null=True)
    active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Kategoria"
        verbose_name_plural = "Kategorie"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save()

class Sex(models.Model):
    name = models.CharField(max_length=25)
    #TODO: zeby w adminie pisało płeć
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=150, unique=True)
    image = models.ImageField(upload_to='thumbnails/')
    description = models.TextField(max_length=2500)
    category = models.ManyToManyField(Category)
    sex = models.ForeignKey(Sex, on_delete=models.CASCADE, blank=True, null=True)
    price = models.IntegerField()
    discount_price = models.IntegerField(blank=True, null=True)
    active = models.BooleanField(default=True)
    slug = models.SlugField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Produkt"
        verbose_name_plural = "Produkty"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Product, self).save()

class ProductImage(models.Model):
    reference_name = models.CharField(max_length=55)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='detail/')

    class Meta:
        verbose_name = "Zdjęcie Produktu"
        verbose_name_plural = "Zdjęcia Produktów"

    def __str__(self):
        return self.reference_name

class ProductStock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.CharField(max_length=12)
    quantity = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Wyposarzenie w Produkt"
        verbose_name_plural = "Wyposarzenie w Produkty"

    def __str__(self):
        return f'{self.quantity} x {self.product.name}: {self.size}'

# WAŻNE!!!
'''
ProductStock odwołuje się do ilości rozmiarów danych produktów,
CartItem to reprezentacja ProductStock w koszyku przypisanym do użytkownika.
Aby zapisać poprawnie koszyk we frontendzie trzeba będzie przefiltrować
wszystkie CartItem dla użytkownika o danym ID. Model zbiera informacje
o obcym kluczu do ProductStock i obliczoną cenę obiektów. Miejmy nadzieję,
że to działa.
'''

class CartItem(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="User")
    product = models.ForeignKey(ProductStock, on_delete=models.CASCADE, blank=True, null=True, related_name="Product")
    amount = models.IntegerField(default=0, blank=True, null=True)
    size = models.CharField(max_length=10, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    discount_price = models.IntegerField(blank=True, null=True)
    thumbnail = models.ImageField(blank=True, null=True)
    slug = models.SlugField(blank=True, null=True)

    class Meta:
        verbose_name = "Przedmiot w Koszyku"
        verbose_name_plural = "Przedmioty w Koszyku"

    def __str__(self):
        return f'{self.user.email}, {self.name}, {self.product.size}: {self.amount}'
    
    def save(self, *args, **kwargs):
        self.name = self.product.product.name
        self.price = self.product.product.price
        self.discount_price = self.product.product.discount_price
        self.thumbnail = self.product.product.image
        self.slug = self.product.product.slug
        super(CartItem, self).save()

class Code(models.Model):
    code = models.CharField(max_length=10, unique=True)
    owner = models.CharField(max_length=35)
    email = models.EmailField(max_length=50)
    discount_factor = models.IntegerField(default=0)
    marketers_share = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Kod"
        verbose_name_plural = "Kody"

    def __str__(self):
        return f'{self.code}: {self.owner}'
    
    def save(self, *args, **kwargs):
        self.code = self.code.lower()
        super(Code, self).save()

#Zdjęcia na głównej stronie
class CarouselImages(models.Model):
    reference_name = models.CharField(max_length=55)
    image = models.ImageField(upload_to='carousel/')

    class Meta:
        verbose_name = "Zdjęcie w Karuzeli"
        verbose_name_plural = "Zdjęcia w Karuzeli"

    def __str__(self):
        return self.reference_name