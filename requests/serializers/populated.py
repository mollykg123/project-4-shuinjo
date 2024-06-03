from rest_framework.serializers import ModelSerializer
from ..models import Request
from users.serializers.common import UserSerializer
from items.serializers.common import ItemSerializer


class PopulatedRequestSerializer(ModelSerializer):
  sender = UserSerializer()
  receiver = UserSerializer()
  item_offered = ItemSerializer(many=False)
  item_requested = ItemSerializer(many=False)

  class Meta:
    model = Request
    fields = ('id', 'status', 'sender', 'receiver', 'item_offered', 'item_requested', 'timestamp')
