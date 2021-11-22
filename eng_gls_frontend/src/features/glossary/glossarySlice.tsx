import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Glossary } from '../../models/glossary'



const initialState: Glossary = {
  id: 0,
  title: ''
}

export const glossary = createSlice({
  name: 'glossary',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setTitle } = glossary.actions

export default glossary.reducer