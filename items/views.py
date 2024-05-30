from .serializers.common import ItemSerializer
from rest_framework import generics
from .models import Item

# Index View
class ItemIndexView(generics.ListCreateAPIView):
  queryset = Item.objects.all()
  serializer_class = ItemSerializer

# Detail View
class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Item.objects.all()
  serializer_class = ItemSerializer