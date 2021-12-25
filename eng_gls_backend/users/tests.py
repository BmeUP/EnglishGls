import logging

from django.test import Client
from django.contrib.auth.hashers import make_password
from rest_framework.test import APITestCase

from users.models import User


class BaseSetUp(APITestCase):
    def setUp(self) -> None:
        User.objects.create(username='TestUser', 
            password=make_password('testpwd123'), 
            email='test@user.com')
    
    def sign_in(self) -> Client:
        data = {
            'username': 'TestUser',
            'password': 'testpwd123'
        }
        r = self.client.post('/api/token/', data=data)
        self.assertEqual(r.status_code, 200)
        return self.client

class UserTestCase(BaseSetUp):
    def test_users(self):
        """User equality"""
        test_user = User.objects.get(username='TestUser')
        self.assertEqual(test_user.email, 'test@user.com')
