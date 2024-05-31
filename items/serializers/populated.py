from .common import ItemSerializer
from users.serializers.common import RegisterSerializer

class PopulatedItemSerializer(ItemSerializer):
    owner = RegisterSerializer()

