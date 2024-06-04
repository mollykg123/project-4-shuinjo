from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers.common import RegisterSerializer
from .serializers.populated import ProfileSerializer
from lib.permissions import IsOwnerOrHasTrades
from rest_framework.response import Response

class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

class ProfileView(RetrieveAPIView):
  # queryset = User.objects.all()
  # serializer_class = ProfileSerializer
  permission_classes = [IsAuthenticated]

  def get(self, request, *args, **kwargs):
    user = request.user
    serializer = ProfileSerializer(user, context={'request': request})
    return Response(serializer.data)