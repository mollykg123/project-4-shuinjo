from rest_framework.permissions import BasePermission, SAFE_METHODS


# This custom authentication class will allow read-only access on GET requests, but authorise PUT, PATCH & DELETE requests
class IsOwnerOrReadOnly(BasePermission):   
  def has_object_permission(self, request, view, obj):
    if request.method in SAFE_METHODS:
      return True
    return obj.owner == request.user



class IsOwner(BasePermission): 
  def has_object_permission(self, request, view, obj):
    return obj.owner == request.user
    


#   Custom permission to allow senders to delete and update non-status fields and receivers to update status.
class IsSenderOrReceiverForDeleteOrReadOnly(BasePermission):

  def has_object_permission(self, request, view, obj):
    # Allow read-only access for safe methods
      if request.method in SAFE_METHODS:
        return True
        
    # Allow delete if the user is the sender
      if request.method == 'DELETE' and obj.sender == request.user:
        return True
        
    # Allow updates if the user is the sender, but not on the status field
      if request.method in ['PUT', 'PATCH'] and obj.sender == request.user:
        if 'status' not in request.data:
          return True
        
    # Allow updates to status if the user is the receiver
      if request.method in ['PUT', 'PATCH'] and obj.receiver == request.user:
        if 'status' in request.data and len(request.data) == 1:
          return True
        
      return False