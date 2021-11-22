import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/user'



const initialState: User = {
  username: '',
  email: '',
  password: ''
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userName: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },

    userEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },

    userPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { userName, userEmail, userPassword } = usersSlice.actions

export default usersSlice.reducer