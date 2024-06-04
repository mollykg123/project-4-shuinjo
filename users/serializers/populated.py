from rest_framework.serializers import ModelSerializer, SerializerMethodField
from ..models import User
from items.serializers.common import ItemSerializer
from requests.serializers.common import RequestSerializer
from requests.serializers.populated import PopulatedRequestSerializer

class ProfileSerializer(ModelSerializer):
  items_created = ItemSerializer(many=True)
  sent_requests = SerializerMethodField()
  received_requests = SerializerMethodField()

  class Meta:
    model = User
    fields = ('id', 'username', 'location', 'items_created', 'sent_requests', 'received_requests')

  def get_sent_requests(self, obj):
    user = self.context['request'].user
    if user == obj or self.has_trades(user, obj):
        return PopulatedRequestSerializer(obj.sent_requests.all(), many=True).data
    return []

  def get_received_requests(self, obj):
    user = self.context['request'].user
    if user == obj or self.has_trades(user, obj):
        return PopulatedRequestSerializer(obj.received_requests.all(), many=True).data
    return []

def has_trades(self, user, profile_user):
    sent_trades = user.sent_requests.filter(receiver=profile_user).exists()
    received_trades = user.received_requests.filter(sender=profile_user).exists()
    return sent_trades or received_trades