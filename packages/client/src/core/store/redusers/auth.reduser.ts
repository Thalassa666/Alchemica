import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUserState {
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  isAuth: boolean
}

const initialState: IUserState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  isAuth: false,
}
