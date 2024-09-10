// Данный редьюсер реализован только в учебных целях,
// так как все данные пользователя хранятся в auth.reducer
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'
import { IUserChangePass } from '@core/utils/interfaces/User'
import { userApi } from '@core/api'

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

const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (file: File, { rejectWithValue }) => {
    try {
      await userApi.changeAvatar(file)
    } catch (error) {
      return rejectWithValue(error)
    }
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

export const userReducer = createSlice({
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
  },
})

export default userReducer.reducer

export { updateUserData, changeAvatar }
