import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redusers/auth.reduser'

export const store = configureStore({
  reducer: {
    authReducer,
  },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
