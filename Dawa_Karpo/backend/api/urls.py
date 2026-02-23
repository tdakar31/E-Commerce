from django.urls import path
from .views import ProductListCreateView
# from .views import RegisterView, 
# from .views import LoginView
from .views import register_user
from .views import reset_password
# from .views import login_view
from .views import LoginView
from .views import latest_products
# from .views import user_profile

from django.conf import settings
from django.conf.urls.static import static
from .views import UserProfileView
from .views import ContactListCreateView
from .views import add_to_cart
from .views import get_cart
from .views import delete_cart_item
from .views import create_order
urlpatterns = [
    path("products/", ProductListCreateView.as_view(), name="products"),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', register_user, name='register'),
    path('reset-password/', reset_password, name='reset_password'),
    # path("login/", LoginView.as_view()),
    # urls.py
    path('latest-products/', latest_products),
    # path('api/profile/', user_profile),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("contacts/", ContactListCreateView.as_view(), name="contacts"),
    path("add-to-cart/", add_to_cart, name="add-to-cart"),
    path("cart/", get_cart, name="get-cart"),
    path("cart/<int:pk>/", delete_cart_item, name="delete-cart-item"),
    path("api/create-order/", create_order),

  
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)