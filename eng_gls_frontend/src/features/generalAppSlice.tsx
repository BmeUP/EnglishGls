import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GeneralApp } from '../models/general'
import { Glossary } from '../models/glossary'
import { WordWithTranslation } from '../models/word'



const initialState: GeneralApp = {
  show_modal: false,
  glossaries: [],
  choosed_glsttl: '',
  choosed_glsid: 0,
  show_word_modal: false,
  word_with_t: []
}

export const generalApp = createSlice({
  name: 'general_app',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<boolean>) => {
      state.show_modal = !state.show_modal
    },
    showWordModal: (state, action: PayloadAction<boolean>) => {
      state.show_word_modal = !state.show_word_modal
    },
    setGlossaries: (state, action: PayloadAction<Glossary[]>) => {
      state.glossaries = action.payload
    },
    setChoosedGlsT: (state, action: PayloadAction<any>) => {
      state.choosed_glsttl = action.payload.title
      state.choosed_glsid = action.payload.id
    },
    setWords: (state, action: PayloadAction<WordWithTranslation[]>) => {
      state.word_with_t = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { showModal, setGlossaries, setChoosedGlsT, showWordModal, setWords } = generalApp.actions

export default generalApp.reducer