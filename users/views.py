from rest_framework.generics import CreateAPIView
from .models import User
from .serializers.common import RegisterSerializer

class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

# Create your views here.
