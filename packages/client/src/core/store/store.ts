import userReducer from '@core/store/reducers/user.reducer'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import { soundReducer } from './reducers/sound.reducer'

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    soundReducer,
  },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
