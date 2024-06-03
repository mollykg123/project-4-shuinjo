from django.urls import path
from .views import RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView

# requests hitting this router all start with:
# ! /api/auth/

urlpatterns = [
  path('register/', RegisterView.as_view()), # /api/auth/register/
  path('login/', TokenObtainPairView.as_view())
]