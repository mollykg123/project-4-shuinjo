from rest_framework import generics
from .models import Request
from .serializers.common import RequestSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from lib.permissions import IsSenderOrReceiverForDeleteOrReadOnly
from lib.views import ObjectOwnerView

# index view for listing and creating requests
class RequestIndexView(ObjectOwnerView, generics.ListCreateAPIView):
  queryset = Request.objects.all()
  serializer_class = RequestSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]

  def perform_create(self, serializer):
    sender = self.request.user
    item_requested = serializer.validated_data.get('item_requested')
    receiver = item_requested.owner
    serializer.save(sender=sender, receiver=receiver)

# Detail view for retrieving, updating and deleting a specific request
class RequestDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Request.objects.all()
  serializer_class = RequestSerializer
  permission_classes = [IsSenderOrReceiverForDeleteOrReadOnly]
