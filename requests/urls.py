from django.urls import path
from .views import RequestDetailView, RequestIndexView

# Index endpoint: /api/requests
# Show endpoint: /api/requests/:requestId

urlpatterns = [
  path('', RequestIndexView.as_view()), # /api/requests/
  path('<int:pk>/', RequestDetailView.as_view()) # /api/requests/:pk
]