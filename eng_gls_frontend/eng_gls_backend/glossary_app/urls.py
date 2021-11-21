from django.urls import path
from .views import (CreateGlossary,
                    GetOwnerGlossary,
                    CreateWord, GetWordsByGlossary)


urlpatterns = [
    path('create-glossary/', CreateGlossary.as_view()),
    path('get-glossary/', GetOwnerGlossary.as_view()),
    path('create-word/', CreateWord.as_view()),
    path('get-words/', GetWordsByGlossary.as_view())
]

