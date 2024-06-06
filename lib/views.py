from rest_framework.views import APIView

class ObjectOwnerView(APIView):

    def perform_create(self, serializer):
        print('self request', self.request.user)
        serializer.save(owner=self.request.user)