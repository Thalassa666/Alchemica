import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ISoundState {
  soundOn: boolean
  track: string | null
}

const initialSoundState: ISoundState = {
  soundOn: false,
  track: 'common',
}

export const soundSlice = createSlice({
  name: 'sound',
  initialState: initialSoundState,
  reducers: {
    switchSound: state => {
      state.soundOn = !state.soundOn
    },
    changeTrack: (state, action: PayloadAction<string>) => {
      state.track = action.payload
    },
    clearState: state => {
      return initialSoundState
    },
  },
})

export const { actions: soundActions } = soundSlice
export const { reducer: soundReducer } = soundSlice
