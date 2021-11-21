from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import RegisterUser, RetriveUserData, UpdateDeleteUser
from users.custom_jwt import MyTokenObtainPairView


urlpatterns = [
    path('sign-up/', RegisterUser.as_view()),
    path('exist-user/<int:pk>', UpdateDeleteUser.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('retrive-user-name/', RetriveUserData.as_view())
]

