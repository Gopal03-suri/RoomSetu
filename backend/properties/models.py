from django.db import models
from users.models import User

class Property(models.Model):
    TYPE_CHOICES = [
        ('Room', 'Room'),
        ('Flat', 'Flat'),
        ('Villa', 'Villa'),
        ('PG', 'PG'),
    ]
    
    FURNISHED_CHOICES = [
        ('Furnished', 'Furnished'),
        ('Semi-Furnished', 'Semi-Furnished'),
        ('Unfurnished', 'Unfurnished'),
    ]
    
    GENDER_CHOICES = [
        ('Any', 'Any'),
        ('Boys', 'Boys'),
        ('Girls', 'Girls'),
        ('Family', 'Family'),
    ]
    
    VERIFICATION_CHOICES = [
        ('Field Verified', 'Field Verified'),
        ('Video Verified', 'Video Verified'),
        ('Rural Verified', 'Rural Verified'),
        ('Basic Verified', 'Basic Verified'),
    ]
    
    RISK_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    rent = models.IntegerField()
    property_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    furnished = models.CharField(max_length=20, choices=FURNISHED_CHOICES)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    smoking = models.BooleanField(default=False)
    pets = models.BooleanField(default=False)
    verified = models.CharField(max_length=20, choices=VERIFICATION_CHOICES, default='Basic Verified')
    scam_risk = models.CharField(max_length=10, choices=RISK_CHOICES, default='Low')
    compatibility = models.IntegerField(default=70)
    image = models.CharField(max_length=10, default='🏠')
    rooms = models.IntegerField(default=1)
    bathrooms = models.IntegerField(default=1)
    amenities = models.JSONField(default=list)
    available = models.CharField(max_length=50, default='Immediate')
    deposit = models.IntegerField()
    description = models.TextField()
    rural = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Roommate(models.Model):
    SLEEP_CHOICES = [
        ('Night Owl', 'Night Owl'),
        ('Early Bird', 'Early Bird'),
    ]
    
    FOOD_CHOICES = [
        ('Veg', 'Veg'),
        ('Non-Veg', 'Non-Veg'),
    ]
    
    GUEST_CHOICES = [
        ('Often', 'Often'),
        ('Sometimes', 'Sometimes'),
        ('Rarely', 'Rarely'),
    ]
    
    WORK_CHOICES = [
        ('WFH', 'WFH'),
        ('WFO', 'WFO'),
        ('Student', 'Student'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='roommate_profile')
    age = models.IntegerField()
    profession = models.CharField(max_length=100)
    compatibility = models.IntegerField(default=70)
    sleep = models.CharField(max_length=20, choices=SLEEP_CHOICES)
    cleanliness = models.IntegerField(default=5)
    food = models.CharField(max_length=20, choices=FOOD_CHOICES)
    guests = models.CharField(max_length=20, choices=GUEST_CHOICES)
    work_type = models.CharField(max_length=20, choices=WORK_CHOICES)
    budget = models.CharField(max_length=50)
    verified = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.user.username} - {self.profession}"
