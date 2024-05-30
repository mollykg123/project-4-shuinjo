from django.urls import path
from .views import ItemDetailView, ItemIndexView

# Index endpoint: /api/items
# Show endpoint: /api/items/:itemId

urlpatterns = [
  path('', ItemIndexView.as_view()), # /api/items/
  path('<int:pk>/', ItemDetailView.as_view()) # /api/items/:pk
]