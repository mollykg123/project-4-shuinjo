from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers.common import RegisterSerializer
from .serializers.populated import ProfileSerializer
from lib.permissions import IsOwnerOrHasTrades

class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

class ProfileView(RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = ProfileSerializer
  permission_classes = [IsAuthenticated, IsOwnerOrHasTrades]

  def get_serializer_context(self):
    context = super().get_serializer_context()
    context['request'] = self.request
    return context