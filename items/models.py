from django.db import models

# Create your models here.
class Item(models.Model):
  title = models.CharField(max_length=50)
  image = models.CharField(max_length=100)
  description = models.CharField(max_length=200, blank=True, null=True)
  may_contain = models.CharField(max_length=50, blank=True, null=True)
  desired_trades = models.CharField(max_length=50, blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  owner = models.ForeignKey(
    'users.User',
    related_name = 'items_created',
    on_delete=models.CASCADE,
    blank=True       
  )
  
  def __str__(self):
    return f'{self.title}'     
