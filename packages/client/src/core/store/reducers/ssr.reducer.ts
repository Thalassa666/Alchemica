import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TRootState } from '../store'

export interface SsrState {
  pageHasBeenInitializedOnServer: boolean
}

const initialState: SsrState = {
  pageHasBeenInitializedOnServer: false,
}

export const ssrSlice = createSlice({
  name: 'ssr',
  initialState,
  reducers: {
    setPageHasBeenInitializedOnServer: (
      state: SsrState,
      action: PayloadAction<boolean>
    ) => {
      state.pageHasBeenInitializedOnServer = action.payload
    },
  },
})

export const selectPageHasBeenInitializedOnServer = (state: TRootState) =>
  state.ssrReducer.pageHasBeenInitializedOnServer

export const { setPageHasBeenInitializedOnServer } = ssrSlice.actions

export default ssrSlice.reducer
