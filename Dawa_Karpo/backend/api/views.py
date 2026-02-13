from rest_framework.generics import ListCreateAPIView
from .models import Product
from .serializers import ProductSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
# from rest_framework.views import api_view
from rest_framework.decorators import api_view

from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .models import Profile
from rest_framework.views import APIView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
# from django.contrib.auth.hashers import make_password


class ProductListCreateView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser)


@api_view(["POST"])
def register_user(request):
    data = request.data

    if User.objects.filter(username=data.get("username")).exists():
        return Response({"error": "Username already exists"}, status=400)

    if User.objects.filter(email=data.get("email")).exists():
        return Response({"error": "Email already exists"}, status=400)

    user = User.objects.create_user(
        username=data.get("username"),
        email=data.get("email"),
        password=data.get("password")
    )

    Profile.objects.create(
        user=user,
        full_name=data.get("full_name"),
        phone=data.get("phone"),
        address=data.get("address"),
        dob=data.get("dob"),
        profile_photo=request.FILES.get("profile_photo")
    )

    return Response({"message": "User registered successfully"}, status=201)




class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user) 
            profile = Profile.objects.filter(user=user).first()
            return Response(
                {
                    "success": True,
                    "message": "Login successful",
                    "username": user.username,
                    "profile_image": profile.profile_photo.url if profile and profile.profile_photo else None,

                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "success": False,
                "message": "Invalid username or password",
            },
            status=status.HTTP_401_UNAUTHORIZED
        )



@csrf_exempt
def reset_password(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            new_password = data.get("newPassword")

            # Validate input
            if not username or not new_password:
                return JsonResponse({"success": False, "message": "Required fields missing"})

            # Find the user from your admin list (e.g., Sonam66)
            try:
                user = User.objects.get(username=username)
                user.set_password(new_password) # Correctly hashes the password
                user.save()
                return JsonResponse({"success": True, "message": "Password updated successfully!"})
            except User.DoesNotExist:
                return JsonResponse({"success": False, "message": "User not found in database"})

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})
    
    return JsonResponse({"success": False, "message": "Invalid request"})




@api_view(['GET'])
def latest_products(request):
    products = Product.objects.order_by('-created_at')[:4]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Profile

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_profile(request):
#     user = request.user
#     profile = Profile.objects.get(user=user)

#     return Response({
#         "username": user.username,
#         "email": user.email,
#         "phone": profile.phone,
#         "address": profile.address,
#     })

from .serializers import ProfileSerializer
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=404)

        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


from .models import Order
from .serializers import OrderSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def track_order(request, order_id):
    order = Order.objects.get(id=order_id, user=request.user)

    return Response({
        "product_name": order.product_name,
        "status": order.status,
        "total_price": order.total_price,
        "created_at": order.created_at,
    })


from django.db.models import Q
from rest_framework import generics


class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        search = self.request.query_params.get('search')

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(category__icontains=search)
            )

        return queryset
    

from rest_framework import generics
from .models import Contact
from .serializers import ContactSerializer

class ContactListCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all().order_by('-created_at')
    serializer_class = ContactSerializer