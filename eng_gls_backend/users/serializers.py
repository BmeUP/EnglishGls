import logging
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        """
        Create and return a new `User` instance, given the validated data.
        """
        errors = dict() 
        try:
            validate_password(validated_data.get('password'), user=User)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)
        
        validated_data['password'] = make_password(
            validated_data.get('password'))
        return User.objects.create(**validated_data)
