import { Glossary } from "./glossary";
import { WordWithTranslation } from "./word";

export interface GeneralApp{
    show_modal: boolean,
    glossaries: Glossary[],
    choosed_glsttl: string,
    choosed_glsid: number,
    show_word_modal: boolean,
    word_with_t: WordWithTranslation[]
}