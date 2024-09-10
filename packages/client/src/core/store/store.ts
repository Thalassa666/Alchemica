import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import userReducer from '@core/store/reducers/user.reducer'

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
  },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
