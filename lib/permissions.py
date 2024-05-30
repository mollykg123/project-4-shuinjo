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