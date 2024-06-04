from django.urls import path
from .views import ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView

# requests hitting this router all start with:
# ! /api/profile/

urlpatterns = [
  path('', ProfileView.as_view())
]