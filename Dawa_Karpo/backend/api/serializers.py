from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User
from .models import Order
from .models import Profile
from .models import Contact
from .models import Cart

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['full_name', 'phone', 'address', 'dob', 'profile_photo']
# class UserProfileSerializer(serializers.ModelSerializer):
#     phone = serializers.CharField(source="profile.phone", allow_null=True)
#     address = serializers.CharField(source="profile.address", allow_null=True)

#     class Meta:
#         model = User
#         fields = ["username", "email", "phone", "address"]




class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'



class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"



# class CartSerializer(serializers.ModelSerializer):
#     product_name = serializers.CharField(source="product.name", read_only=True)
#     product_price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2, read_only=True)
#     product_image = serializers.ImageField(source="product.image", read_only=True)

#     class Meta:
#         model = Cart
#         fields = ["id", "product", "product_name", "product_price", "product_image", "size", "quantity"]
class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'