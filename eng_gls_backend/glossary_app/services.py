from rest_framework import response, status


def word_gls_ser(word_gls_serializer, request, TranslationSerializer):
    """Create Word in glossary and translation"""
    if word_gls_serializer.is_valid():
            wig = word_gls_serializer.save()
            t_data = request.data.get('translation')
            t_data.update({
                    "translation_owner": request.user.id,
                    "for_word": wig.word.id})
            translation_serializer = TranslationSerializer(
                data=t_data)
            return create_translation(translation_serializer, 
                                      word_gls_serializer)
    return response.Response(
        {"word_gls_errors": word_gls_serializer.errors},
        status=status.HTTP_400_BAD_REQUEST)

def create_translation(translation_serializer, word_gls_serializer):
    """Create translation for word"""
    if translation_serializer.is_valid():
                translation_serializer.save()
                return response.Response(word_gls_serializer.data, 
                                        status=status.HTTP_201_CREATED)
    return response.Response(
        {"translation_gls_errors": translation_serializer.errors},
        status=status.HTTP_400_BAD_REQUEST)
