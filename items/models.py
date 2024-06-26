from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Item(models.Model):
  title = models.CharField(max_length=200)
  image = models.CharField(max_length=300)
  description = models.CharField(max_length=200, blank=True, null=True)
  may_contain = ArrayField(models.CharField(max_length=50), blank=True, null=True)
  desired_trades = ArrayField(models.CharField(max_length=50), blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  owner = models.ForeignKey(
    to = 'users.User',
    related_name = 'items_created',
    on_delete = models.CASCADE,
    blank = True       
  )
  
  def __str__(self):
    return f'{self.title}'     
