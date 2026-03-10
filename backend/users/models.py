from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('tenant', 'Tenant'),
        ('owner', 'Owner'),
        ('agent', 'Field Agent'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='tenant')
    avatar = models.CharField(max_length=5, blank=True)
    city = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    
    # Firebase Phone Authentication fields
    phone_number = models.CharField(max_length=20, unique=True, null=True, blank=True, db_index=True)
    firebase_uid = models.CharField(max_length=128, unique=True, null=True, blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
    def __str__(self):
        return f"{self.username} ({self.role})"
