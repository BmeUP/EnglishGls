import logging
from rest_framework import generics, response, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Glossary, WordInGlossary
from .serializers import (GlossarySerializer,
                          CreateWordInGlossarySerializer,
                          TranslationSerializer, WordInGlossarySerializer)
from users.custom_jwt import CookieAuthJWT
from .services import word_gls_ser


class CreateGlossary(generics.CreateAPIView):
    """Create glossary for authenticated user"""
    authentication_classes = [CookieAuthJWT]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data
        data._mutable = True
        data.update({
            "owner": request.user.id
        })
        serializer_g = GlossarySerializer(data=data)

        if serializer_g.is_valid():
            serializer_g.save()
            return response.Response(serializer_g.data)
        return response.Response(data = {
                    "gls_errors": serializer_g.errors},
                status=status.HTTP_400_BAD_REQUEST)



class GetOwnerGlossary(generics.ListAPIView):
    """Get glossarys for concrete user"""
    authentication_classes = [CookieAuthJWT]
    permission_classes = [IsAuthenticated]
    queryset = Glossary.objects.all()
    serializer_class = GlossarySerializer

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user.id)


class GetWordsByGlossary(generics.ListAPIView):
    """Get words by glossary id"""
    authentication_classes = [CookieAuthJWT]
    permission_classes = [IsAuthenticated]
    queryset = WordInGlossary.objects.all()
    serializer_class = WordInGlossarySerializer

    def get_queryset(self):
        gls_id = self.request.GET.get('gls_id', '')
        return self.queryset.filter(glossary=gls_id)


class CreateWord(APIView):
    """Create whole stuff like word, translation and

    add word to glossary if incoming data is valid.
    Otherwise return errors from serializer
    """
    authentication_classes = [CookieAuthJWT]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        word_gls_serializer = CreateWordInGlossarySerializer(
                data={
                    "word": request.data.get('word'),
                    "glossary_id": request.data.get('glossary_id')})
        res = word_gls_ser(word_gls_serializer, request, TranslationSerializer)
        return res


class DeleteGlossary(generics.DestroyAPIView):
    """Delete owner`s glossary"""
    authentication_classes = [CookieAuthJWT]
    permission_classes = [IsAuthenticated]
    queryset = Glossary.objects.all()