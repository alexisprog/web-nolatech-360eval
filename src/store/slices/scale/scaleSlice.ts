import { Scale } from '@/@types/scale'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ScaleState = {
  scales: Scale[]
  loading: boolean
}

const initialState: ScaleState = {
  scales: [],
  loading: false,
}

export const scaleSlice = createSlice({
  name: 'scale',
  initialState,
  reducers: {
    getScalesAction: (state) => {
      state.loading = true
    },
    setScales: (state, action: PayloadAction<Scale[]>) => {
      state.scales = action.payload
      state.loading = false
    },
    setFailedAction: (state) => {
      state.loading = false
    },
  },
})

export const scaleActions = scaleSlice.actions

export default scaleSlice.reducer
