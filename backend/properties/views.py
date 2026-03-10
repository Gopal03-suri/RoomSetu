from rest_framework import viewsets, filters
from .models import Property, Roommate
from .serializers import PropertySerializer, RoommateSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'location', 'description']
    ordering_fields = ['rent', 'created_at', 'compatibility']

class RoommateViewSet(viewsets.ModelViewSet):
    queryset = Roommate.objects.all()
    serializer_class = RoommateSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['profession', 'user__city']
    ordering_fields = ['compatibility', 'age']
