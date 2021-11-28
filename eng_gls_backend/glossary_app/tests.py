from django.test import TestCase

class GlsTestCase(TestCase):
    def test_word(self):
        """Word equality"""
        self.assertEqual('a', 'a')