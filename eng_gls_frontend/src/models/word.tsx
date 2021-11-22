export interface WordInGlossary{
    glossary_id: number,
    word: string,
    translation: {translation_text: string, description: string}
}

export interface WordWithTranslation{
    word: {id: number, word: string},
    translation: [{translation_text: string, description: string}],
    repeated: number
}