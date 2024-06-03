from rest_framework.serializers import ModelSerializer, CharField, ValidationError
from ..models import User
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(ModelSerializer):

  password = CharField(write_only=True)
  password_confirmation = CharField(write_only=True)

  class Meta:
    model = User
    fields = ('id', 'username', 'password', 'password_confirmation', 'location')
  
  def validate(self, data):
    password = data.get('password')
    password_confirmation = data.pop('password_confirmation')

    if password != password_confirmation:
      raise ValidationError('Passwords do not match.')
    
    # validate_password(password)

    return data
  
  def create(self, validated_data):
    return User.objects.create_user(**validated_data)
  

class UserSerializer(ModelSerializer):
  class Meta: 
    model = User
    fields = ('id', 'username', 'location')