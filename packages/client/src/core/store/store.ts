import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'

export const store = configureStore({
  reducer: {
    authReducer,
  },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
