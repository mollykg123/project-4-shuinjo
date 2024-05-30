from django.db import models

# Create your models here.
class Request(models.Model):
    sender = models.ForeignKey(
        'users.User',
        related_name='sent_request',
        on_delete=models.CASCADE,
        blank=True 
    ) 
    receiver = models.ForeignKey(   
        'users.User', 
        related_name='received_request',
        on_delete=models.CASCADE,
        blank=True
    )
    item_offered = models.ForeignKey(
        'items.Item',
        related_name='offered_in_request',
        on_delete=models.CASCADE,
        blank=True
    )
    item_requested = models.ForeignKey(
        'items.Item',
        related_name='requested_in_request',
        on_delete=models.CASCADE,
        blank=True
    )
    status = models.CharField(max_length=20, blank=True, null=True, default='pending')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message from {self.sender} to {self.receiver} about {self.item_offered} for {self.item_requested}'
    
    def owner(self):
        return self.sender