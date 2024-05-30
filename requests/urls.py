from django.urls import path
from .views import RequestDetailView, RequestIndexView

# Index endpoint: /api/items
# Show endpoint: /api/items/:itemId

urlpatterns = [
  path('', RequestIndexView.as_view()), # /api/items/
  path('<int:pk>/', RequestDetailView.as_view()) # /api/items/:pk
]