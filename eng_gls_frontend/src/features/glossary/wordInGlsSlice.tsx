import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WordInGlossary} from '../../models/word'



const initialState: WordInGlossary = {
    glossary_id: 0,
    word: '',
    translation: {translation_text: '', description: ''}
}

export const wording = createSlice({
  name: 'wording',
  initialState,
  reducers: {
    setWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload
    },

    setGlsId: (state, action: PayloadAction<number>) => {
      state.glossary_id = action.payload
    },

    setTranslation: (state, action: PayloadAction<string>) => {
        state.translation.translation_text = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.translation.description = action.payload;
  }
  }
})

// Action creators are generated for each case reducer function
export const { setWord, setGlsId, setTranslation, setDescription } = wording.actions

export default wording.reducer