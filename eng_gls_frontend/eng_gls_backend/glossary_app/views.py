import logging
from rest_framework import generics, response, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Glossary, Word, WordInGlossary
from .serializers import (GlossarySerializer,
                          CreateWordInGlossarySerializer,
                          TranslationSerializer, WordInGlossarySerializer, WordSerializer)
from users.custom_jwt import CookieAuthJWT


class CreateGlossary(generics.CreateAPIView):
    """Create glossary for authenticated user"""
    authentication_classes = [CookieAuthJWT]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data
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
        
        if word_gls_serializer.is_valid():
            wig = word_gls_serializer.save()
            t_data = request.data.get('translation')
            t_data.update({
                    "translation_owner": request.user.id,
                    "for_word": wig.word.id})
            translation_serializer = TranslationSerializer(
                data=t_data)
            
            if translation_serializer.is_valid():
                translation_serializer.save()
                return response.Response(word_gls_serializer.data)
            return response.Response(
                data = {
                    "translation_gls_errors": translation_serializer.errors},
                status=status.HTTP_400_BAD_REQUEST)
        
        return response.Response(
                data = {
                    "word_gls_errors": word_gls_serializer.errors},
                status=status.HTTP_400_BAD_REQUEST)
