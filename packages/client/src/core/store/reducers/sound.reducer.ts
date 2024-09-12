import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ISoundState {
  soundOn: boolean
  track: string | null
}

const initialState: ISoundState = {
  soundOn: false,
  track: 'common',
}

const switchSound = createAction('SWITCH_SOUND')
const changeTrack = createAction('CHANGE_TRACK')

export const soundReducer = createSlice({
  name: 'sound',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Запрос данных пользователя
      .addCase(switchSound, state => {
        state.soundOn = !state.soundOn
      })
      .addCase(changeTrack, (state, action: PayloadAction<any>) => {
        state.track = action.payload
      })
  },
})

export default soundReducer.reducer
