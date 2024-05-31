from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .models import User
from .serializers.common import RegisterSerializer, ProfileSerializer

class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

# class ProfileView(RetrieveAPIView):
#   queryset = User.objects.all()
#   serializer_class = ProfileSerializer
