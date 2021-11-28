from django.test import TestCase
from users.models import User

class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(
            username="testuser",
            email="test@user.com",
            password="12345678qQ"
            )

    def test_users(self):
        """User equality"""
        test_user = User.objects.get(username="testuser")
        self.assertEqual(test_user.email, 'test@user1.com')
