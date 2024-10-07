import { authApi } from '@core/api'
import {
  IUser,
  TOauthRequest,
  TOauthRequest1,
  TUserQuery,
} from '@core/utils/interfaces/User'
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'

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

const getAppIDForYandex = createAsyncThunk(
  'oauth/yandex/service_id',
  async () => {
    return await authApi.getAppID()
  }
)

const loginUserWithYandex = createAsyncThunk(
  'oauth/yandex',
  async (data: TOauthRequest1) => {
    const data1 = {
      code: data.code,
      redirect_uri: data.redirect_uri,
    }
    return await authApi.signInWithYandex(data1 /*, data.jwt*/)
  }
)

const getUserData1 = createAsyncThunk('auth/user1', async (jwt: string) => {
  return await authApi.fetchUser1(jwt)
})

export interface IUserState {
  userData: IUser | Record<string, unknown>
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  isAuth: boolean
  appID?: string | null
  appID1?: any
}

const initialState: IUserState = {
  userData: {},
  isLoading: false,
  isError: false,
  errorMessage: null,
  isAuth: false,
  appID: null,
  appID1: null,
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

      // Вход в систему через Яндекс - получение ID
      .addCase(getAppIDForYandex.pending, state => {
        state.isLoading = true
      })
      .addCase(
        getAppIDForYandex.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.appID = action.payload.service_id
          state.isLoading = false
        }
      )
      .addCase(getAppIDForYandex.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.error as SerializedError).message ?? 'Произошла ошибка'
      })

      // Вход в систему через Яндекс - авторизация
      .addCase(loginUserWithYandex.pending, state => {
        state.isLoading = true
      })
      .addCase(
        loginUserWithYandex.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.appID1 = action.payload
          state.isLoading = false
        }
      )
      .addCase(loginUserWithYandex.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.error as SerializedError).message ?? 'Произошла ошибка'
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

      // Запрос данных пользователя Yandex Oauth
      .addCase(getUserData1.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserData1.fulfilled, (state, action: PayloadAction<any>) => {
        state.userData = action.payload
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(getUserData1.rejected, (state, action) => {
        state.isAuth = false
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.error as SerializedError).message ?? 'Произошла ошибка'
      })
  },
})

export default authReducer.reducer

export {
  getUserData,
  getUserData1,
  registerUser,
  loginUser,
  logoutUser,
  loginUserWithYandex,
  getAppIDForYandex,
}
