import { leaderboardApi } from '@core/api'
import {
  ILeaderboardGetParams,
  ILeaderboardResult,
  ILeaderboardResultData,
} from '@core/utils/interfaces/Leaderboard'
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'

export interface ILeaderboardState {
  leaderboardApi: {
    data: ILeaderboardResultData[] | null
    isLoading: boolean
    isError: boolean
    errorMessage: string | null
  }
}

const initialState: ILeaderboardState = {
  leaderboardApi: {
    data: null,
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
}

// Получение Лидерборда
const getLeaderboard = createAsyncThunk(
  'leaderboard/getLeaderboard',
  async (data: ILeaderboardGetParams, { rejectWithValue }) => {
    try {
      return await leaderboardApi.getLeaderboard(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// Запись результата
const shareLeaderboardResult = createAsyncThunk(
  'leaderboard/shareLeaderboardResult',
  async (data: ILeaderboardResult, { rejectWithValue }) => {
    try {
      return leaderboardApi.shareResult(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      // Получение Лидерборда
      .addCase(getLeaderboard.pending, state => {
        state.leaderboardApi = {
          ...state.leaderboardApi,
          isLoading: true,
        }
      })
      .addCase(
        getLeaderboard.fulfilled,
        (state, action: PayloadAction<ILeaderboardResultData[] | null>) => {
          state.leaderboardApi = {
            ...state.leaderboardApi,
            data: action.payload,
            isLoading: false,
            isError: false,
            errorMessage: '',
          }
        }
      )
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.leaderboardApi = {
          ...state.leaderboardApi,
          isLoading: false,
          isError: true,
          errorMessage:
            (action.payload as SerializedError)?.message ||
            'Произошла ошибка при получении Лидерборда',
        }
      })

      // Запись результата
      .addCase(shareLeaderboardResult.pending, state => {
        state.leaderboardApi = {
          ...state.leaderboardApi,
          isLoading: true,
        }
      })
      .addCase(shareLeaderboardResult.fulfilled, state => {
        state.leaderboardApi = {
          ...state.leaderboardApi,
          data: null,
          isLoading: false,
          isError: false,
          errorMessage: '',
        }
      })
      .addCase(shareLeaderboardResult.rejected, (state, action) => {
        state.leaderboardApi = {
          ...state.leaderboardApi,
          isLoading: false,
          isError: true,
          errorMessage:
            (action.payload as SerializedError)?.message ||
            'Произошла ошибка при получении Лидерборда',
        }
      }),
})

export const { reducer: leaderboardReducer } = leaderboardSlice

export { getLeaderboard, shareLeaderboardResult }
