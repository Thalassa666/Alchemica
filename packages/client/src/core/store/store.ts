import userReducer from '@core/store/reducers/user.reducer'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import { soundReducer } from './reducers/sound.reducer'

declare global {
  interface Window {
    APP_INITIAL_STATE: TRootState
  }
}

export const reducer = combineReducers({
  authReducer,
  userReducer,
  soundReducer,
})

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export type TRootState = ReturnType<typeof reducer>
export type TAppDispatch = typeof store.dispatch
