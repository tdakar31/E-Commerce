from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Product(models.Model):

    CATEGORY_CHOICES = [
        ("shoes", "Shoes"),
        ("lower", "Lower"),
        ("hoodies", "Hoodies"),
        ("jacket", "Jacket"),
        ("t-shirt", "T-Shirt"),
    ]

    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="products/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name




class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    address = models.TextField(blank=True, null=True)
    dob = models.DateField()
    profile_photo = models.ImageField(upload_to="profiles/", null=True, blank=True)

    def __str__(self):
        return self.user.username



@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=200)
    status = models.CharField(max_length=100)
    total_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name