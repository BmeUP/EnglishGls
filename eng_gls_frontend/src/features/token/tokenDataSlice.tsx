import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDataFromToken } from '../../models/token'



const initialState: UserDataFromToken = {
  user_id: 0,
  user_name: ''
}

export const userDataToken = createSlice({
  name: 'user_data',
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<number>) => {
      state.user_id = action.payload
    },

    setUserName: (state, action: PayloadAction<string>) => {
      state.user_name = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserID, setUserName} = userDataToken.actions

export default userDataToken.reducer