# Tenzin_Dakar ps 51019989679989179
# Register your models here.
from django.contrib import admin
from .models import Product, Cart
from .models import Contact
from .models import Profile

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "category", "created_at")
    search_fields = ("name",)
    list_filter = ("category", "created_at")   # 👈 THIS IS THE KEY
    list_per_page = 10

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "full_name", "phone", "dob")




admin.site.register(Contact)
admin.site.register(Cart)