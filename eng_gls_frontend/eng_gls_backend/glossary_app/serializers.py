from django.utils import translation
from rest_framework import serializers
from .models import (
        Glossary,
        Word, Translation,
        WordInGlossary
    )

class GlossarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Glossary
        fields = ['id', 'title', 'owner']


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['id','word']


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = ['translation_text', 'description',
                  'translation_owner', 'for_word']


class WordInGlossarySerializer(serializers.ModelSerializer):
    translation = serializers.SerializerMethodField('get_translation')
    class Meta:
        model = WordInGlossary
        fields = ['word', 'repeated', 'translation']
        depth = 1
    
    def get_translation(self, obj):
        return Translation.objects.all().filter(
                for_word=obj.word.id, 
                translation_owner=self.context.get("request").user.id)\
                .values('translation_text', 'description')
        


class CreateWordInGlossarySerializer(serializers.Serializer):
    word = serializers.CharField()
    glossary_id = serializers.IntegerField()

    def create(self, validated_data):
        word_obj = Word.objects.get_or_create(word=validated_data.get('word'))

        return WordInGlossary.objects.create_or_increment(
                word = word_obj[0],
                glossary = Glossary.objects.get(
                        pk = validated_data.get('glossary_id')
                    )
            )
