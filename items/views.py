from .serializers.common import ItemSerializer
from .serializers.populated import PopulatedItemSerializer
from rest_framework import generics
from .models import Item
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly
from lib.views import ObjectOwnerView

# Index View
class ItemIndexView(ObjectOwnerView, generics.ListCreateAPIView):
  queryset = Item.objects.all()
  serializer_class = PopulatedItemSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]

# Detail View
class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Item.objects.all()
  serializer_class = ItemSerializer
  permission_classes = [IsOwnerOrReadOnly]

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedItemSerializer
    else:
      return ItemSerializer