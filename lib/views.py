from rest_framework.views import APIView

class ObjectOwnerView(APIView):

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)