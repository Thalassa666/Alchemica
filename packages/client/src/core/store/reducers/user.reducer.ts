// ***
// Данный редьюсер реализован только в учебных целях, так как все данные пользователя хранятся в auth.reducer
// ***

import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'
import { IUserChangePass } from '@core/utils/interfaces/User'
import { userApi } from '@core/api'

// Обновление данных пользователя
const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (data: IUserChangePass, { rejectWithValue }) => {
    try {
      await userApi.updateUserData(data)
      return data // Возвращаем обновленные данные пользователя
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// Изменение аватара
const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (file: File) => {
    await userApi.changeAvatar(file)
  }
)

// Изменение пароля
const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data: IUserChangePass) => {
    return await userApi.changePassword(data)
  }
)

interface IUserState {
  userData: IUserChangePass | Record<string, unknown>
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
}

const initialState: IUserState = {
  userData: {},
  isLoading: false,
  isError: false,
  errorMessage: null,
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Обновление данных пользователя
      .addCase(updateUserData.pending, state => {
        state.isLoading = true
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<IUserChangePass>) => {
          state.userData = action.payload
          state.isLoading = false
          state.isError = false
          state.errorMessage = null
        }
      )
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.payload as SerializedError)?.message ||
          'Произошла ошибка при обновлении данных'
      })

      // Изменение аватара
      .addCase(changeAvatar.pending, state => {
        state.isLoading = true
      })
      .addCase(changeAvatar.fulfilled, state => {
        state.isLoading = false
        state.isError = false
        state.errorMessage = null
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.payload as SerializedError)?.message ||
          'Произошла ошибка при смене аватара'
      })

      // Изменение пароля
      .addCase(changePassword.pending, state => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, state => {
        state.isLoading = false
        state.isError = false
        state.errorMessage = null
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.payload as SerializedError)?.message ||
          'Произошла ошибка при изменении пароля'
      })
  },
})

export default userReducer.reducer

export { updateUserData, changeAvatar, changePassword }
