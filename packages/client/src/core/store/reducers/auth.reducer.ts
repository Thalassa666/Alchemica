import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'
import { IUser, TUserQuery } from '@core/utils/interfaces/User'
import { authApi } from '@core/api'

const getUserData = createAsyncThunk('auth/user', async () => {
  return await authApi.fetchUser()
})

const registerUser = createAsyncThunk('auth/signup', async (data: IUser) => {
  return await authApi.signUp(data)
})

const loginUser = createAsyncThunk('auth/signin', async (data: TUserQuery) => {
  return await authApi.signIn(data)
})

const logoutUser = createAsyncThunk('auth/logout', async () => {
  return await authApi.logout()
})

export interface IUserState {
  userData: IUser | Record<string, unknown>
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  isAuth: boolean
}

const initialState: IUserState = {
  userData: {},
  isLoading: false,
  isError: false,
  errorMessage: null,
  isAuth: false,
}

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Запрос данных пользователя
      .addCase(getUserData.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<any>) => {
        state.userData = action.payload
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isAuth = false
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.error as SerializedError).message ?? 'Произошла ошибка'
      })

      // Регистрация пользователя
      .addCase(registerUser.pending, state => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.userData = action.payload
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuth = false
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.error as SerializedError).message ?? 'Произошла ошибка'
      })

      // Вход в систему
      .addCase(loginUser.pending, state => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.userData = action.payload
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.error as SerializedError).message ?? 'Произошла ошибка'
        if ((action.error as SerializedError).message === 'Ошибка: 400') {
          state.isAuth = true
        }
      })

      // Выход из системы
      .addCase(logoutUser.pending, state => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, state => {
        state.userData = {}
        state.isAuth = false
        state.isLoading = false
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuth = false
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.error as SerializedError).message ?? 'Произошла ошибка'
        console.log((action.error as SerializedError).message)
      })
  },
})

export default authReducer.reducer

export { getUserData, registerUser, loginUser, logoutUser }
