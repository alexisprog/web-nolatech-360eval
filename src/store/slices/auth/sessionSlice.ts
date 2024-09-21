import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export interface SessionState {
  signedIn: boolean
  token: string | null
  refreshToken: string | null
}

const initialState: SessionState = {
  signedIn: false,
  token: null,
  refreshToken: null,
}

const sessionSlice = createSlice({
  name: `${SLICE_BASE_NAME}/session`,
  initialState,
  reducers: {
    signInSuccess(
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>,
    ) {
      state.signedIn = true
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
    },
    signOutSuccess(state) {
      state.signedIn = false
      state.token = null
      state.refreshToken = null
    },
  },
})

export const { signInSuccess, signOutSuccess } = sessionSlice.actions
export default sessionSlice.reducer
