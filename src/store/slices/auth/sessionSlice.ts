import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { SignInCredential, SignInResponse } from '@/@types/auth'

export interface SessionState {
  signedIn: boolean
  token: string | null
}

const initialState: SessionState = {
  signedIn: false,
  token: null,
}

const sessionSlice = createSlice({
  name: `${SLICE_BASE_NAME}/session`,
  initialState,
  reducers: {
    singInAction: (_state, action: PayloadAction<SignInCredential>) => {
      action.payload
    },
    signInSuccess(state, action: PayloadAction<SignInResponse>) {
      state.signedIn = true
      state.token = action.payload.token
    },
    signOutSuccess(state) {
      state.signedIn = false
      state.token = null
    },
  },
})

export const sessionAction = sessionSlice.actions
export const { signOutSuccess } = sessionSlice.actions
export default sessionSlice.reducer
