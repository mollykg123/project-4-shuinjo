from rest_framework.permissions import BasePermission, SAFE_METHODS


# This custom authentication class will allow read-only access on GET requests, but authorise PUT, PATCH & DELETE requests
class IsOwnerOrReadOnly(BasePermission):   
  def has_object_permission(self, request, view, obj):
        # Allow read only access
        # SAFE_METHODS is a tuple: ('GET', 'HEAD', 'OPTIONS')
    if request.method in SAFE_METHODS:
            # If request.method is GET, HEAD or OPTIONS we will return True to allow access
      return True
        # Here 'obj' is the individual object we want to check has a matching owner field
        # For example, object will be the record that we query containing the owner field
    return obj.owner == request.user



class IsOwner(BasePermission): 
  def has_object_permission(self, request, view, obj):
    return obj.owner == request.user
    



class IsSenderOrReceiverForDeleteOrReadOnly(BasePermission):
    """
    Custom permission to allow senders to delete and update non-status fields,
    and receivers to update status.
    """
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