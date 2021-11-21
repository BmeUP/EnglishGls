from rest_framework import generics, response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .custom_jwt import CookieAuthJWT
from .models import User
from .serializers import UserSerializer


class RegisterUser(generics.CreateAPIView):
    """
        simple registartion view
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UpdateDeleteUser(
        generics.UpdateAPIView, 
        generics.DestroyAPIView
    ):
    """
        update or delete concrete user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [CookieAuthJWT]
    permission_classes = [IsAuthenticated]


class RetriveUserData(APIView):
    authentication_classes = [CookieAuthJWT]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({'username': request.user.username}, 
                        status=status.HTTP_200_OK)