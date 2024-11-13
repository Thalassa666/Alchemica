import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ISoundState {
  soundOn: boolean
  track: string | null
  sound: string | null
}

const initialSoundState: ISoundState = {
  soundOn: false,
  track: 'common',
  sound: null,
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
    setSound: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      state.sound = action.payload
    },
    clearState: state => {
      return initialSoundState
    },
  },
})

export const { actions: soundActions } = soundSlice
export const { reducer: soundReducer } = soundSlice
