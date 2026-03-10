from rest_framework import serializers
from .models import Property, Roommate

class PropertySerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.get_full_name', read_only=True)
    
    class Meta:
        model = Property
        fields = '__all__'

class RoommateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    avatar = serializers.CharField(source='user.avatar', read_only=True)
    city = serializers.CharField(source='user.city', read_only=True)
    
    class Meta:
        model = Roommate
        fields = '__all__'
