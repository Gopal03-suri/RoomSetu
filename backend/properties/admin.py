from django.contrib import admin
from .models import Property, Roommate

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['title', 'location', 'rent', 'property_type', 'verified', 'owner']
    list_filter = ['property_type', 'furnished', 'verified', 'scam_risk']
    search_fields = ['title', 'location', 'description']

@admin.register(Roommate)
class RoommateAdmin(admin.ModelAdmin):
    list_display = ['user', 'age', 'profession', 'compatibility', 'verified']
    list_filter = ['verified', 'sleep', 'food', 'work_type']
    search_fields = ['user__username', 'profession']
