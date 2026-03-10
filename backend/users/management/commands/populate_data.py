from django.core.management.base import BaseCommand
from users.models import User
from properties.models import Property, Roommate
from chat.models import Chat, Message

class Command(BaseCommand):
    help = 'Populate database with demo data'

    def handle(self, *args, **kwargs):
        # Create demo users
        users_data = [
            {'username': 'arjun', 'email': 'tenant@roomsetu.com', 'password': '123456', 'role': 'tenant', 
             'first_name': 'Arjun', 'last_name': 'Mehta', 'avatar': 'AM', 'city': 'Pune'},
            {'username': 'priya', 'email': 'owner@roomsetu.com', 'password': '123456', 'role': 'owner',
             'first_name': 'Priya', 'last_name': 'Sharma', 'avatar': 'PS', 'city': 'Mumbai'},
            {'username': 'ravi', 'email': 'agent@roomsetu.com', 'password': '123456', 'role': 'agent',
             'first_name': 'Ravi', 'last_name': 'Kumar', 'avatar': 'RK', 'city': 'Nashik'},
            {'username': 'admin', 'email': 'admin@roomsetu.com', 'password': '123456', 'role': 'admin',
             'first_name': 'Admin', 'last_name': 'User', 'avatar': 'AU', 'city': 'Delhi', 'is_staff': True, 'is_superuser': True},
        ]
        
        for user_data in users_data:
            if not User.objects.filter(email=user_data['email']).exists():
                user = User.objects.create_user(**user_data)
                self.stdout.write(self.style.SUCCESS(f'Created user: {user.email}'))
        
        # Get owner user
        owner = User.objects.get(email='owner@roomsetu.com')
        
        # Create properties
        properties_data = [
            {
                'owner': owner, 'title': 'Cozy 2BHK near Hinjewadi IT Park', 'location': 'Hinjewadi, Pune',
                'rent': 8500, 'property_type': 'Flat', 'furnished': 'Furnished', 'gender': 'Any',
                'smoking': False, 'pets': True, 'verified': 'Field Verified', 'scam_risk': 'Low',
                'compatibility': 92, 'image': '🏢', 'rooms': 2, 'bathrooms': 1,
                'amenities': ['WiFi', 'AC', 'Gym', 'Parking'], 'available': 'Immediate',
                'deposit': 25500, 'description': 'Spacious flat with great ventilation and modern kitchen.'
            },
            {
                'owner': owner, 'title': 'Single Room in PG Near Kothrud', 'location': 'Kothrud, Pune',
                'rent': 5500, 'property_type': 'Room', 'furnished': 'Semi-Furnished', 'gender': 'Boys',
                'smoking': False, 'pets': False, 'verified': 'Basic Verified', 'scam_risk': 'Low',
                'compatibility': 78, 'image': '🏠', 'rooms': 1, 'bathrooms': 1,
                'amenities': ['WiFi', 'Laundry', 'Meals'], 'available': 'Immediate',
                'deposit': 11000, 'description': 'Clean single room with attached bathroom.'
            },
            {
                'owner': owner, 'title': 'Luxury Studio in Baner', 'location': 'Baner, Pune',
                'rent': 15000, 'property_type': 'Flat', 'furnished': 'Furnished', 'gender': 'Any',
                'smoking': False, 'pets': True, 'verified': 'Video Verified', 'scam_risk': 'Low',
                'compatibility': 85, 'image': '🏙', 'rooms': 1, 'bathrooms': 1,
                'amenities': ['WiFi', 'AC', 'Power Backup', 'Security', 'Swimming Pool'],
                'available': 'Dec 1', 'deposit': 45000, 'description': 'Premium studio with rooftop pool access.'
            },
        ]
        
        for prop_data in properties_data:
            if not Property.objects.filter(title=prop_data['title']).exists():
                Property.objects.create(**prop_data)
                self.stdout.write(self.style.SUCCESS(f'Created property: {prop_data["title"]}'))
        
        # Create roommate profiles
        tenant = User.objects.get(email='tenant@roomsetu.com')
        
        roommates_data = [
            {
                'user': tenant, 'age': 24, 'profession': 'Software Engineer', 'compatibility': 94,
                'sleep': 'Night Owl', 'cleanliness': 8, 'food': 'Veg', 'guests': 'Sometimes',
                'work_type': 'WFO', 'budget': '8000-12000', 'verified': True
            },
        ]
        
        for rm_data in roommates_data:
            if not Roommate.objects.filter(user=rm_data['user']).exists():
                Roommate.objects.create(**rm_data)
                self.stdout.write(self.style.SUCCESS(f'Created roommate profile for: {rm_data["user"].username}'))
        
        self.stdout.write(self.style.SUCCESS('Demo data populated successfully!'))
