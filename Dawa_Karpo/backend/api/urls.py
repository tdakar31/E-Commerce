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
from .views import my_orders
from .views import track_order
from django.conf import settings
from django.conf.urls.static import static
from .views import UserProfileView
from .views import ContactListCreateView
from .views import add_to_cart
from .views import get_cart
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
    path('api/my-orders/', my_orders),
    path('api/track-order/<int:order_id>/', track_order),
    path("contacts/", ContactListCreateView.as_view(), name="contacts"),
    path("add-to-cart/", add_to_cart, name="add-to-cart"),
    path("cart/", get_cart, name="get-cart"),

  
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)