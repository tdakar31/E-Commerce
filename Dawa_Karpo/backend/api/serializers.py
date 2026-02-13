from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Order
from .models import Profile
from .models import Contact

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
