from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView

# requests hitting this router all start with:
# ! /api/profile/

urlpatterns = [
  path('',)
]