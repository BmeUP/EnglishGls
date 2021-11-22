import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/users/userSlice';
import tokenDataReducer from '../features/token/tokenDataSlice';
import generalAppReducer from '../features/generalAppSlice';
import glossaryReducer from '../features/glossary/glossarySlice';
import wordingReducer from '../features/glossary/wordInGlsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    token_data: tokenDataReducer,
    general_app: generalAppReducer,
    gls: glossaryReducer,
    wig: wordingReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
