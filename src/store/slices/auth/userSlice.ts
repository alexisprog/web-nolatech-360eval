import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { LoginDataResponse } from '@/@types/auth'

export type UserState = {
  avatar?: string
  userName?: string
  email?: string
  password?: string
  isLoading?: boolean
  authority?: string[]
  role?: number
  user?: LoginDataResponse
}

const initialState: UserState = {
  avatar: '',
  userName: '',
  email: '',
  isLoading: false,
  authority: [],
  role: 0,
}

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.avatar = action.payload?.avatar
      state.email = action.payload?.email
      state.userName = action.payload?.userName
      state.authority = action.payload?.authority
      state.role = action.payload?.role
      state.user = action.payload.user
    },
    resetStateUser() {
      return initialState
    },
  },
})

export const userActions = userSlice.actions

export const { setUser, resetStateUser } = userSlice.actions

export default userSlice.reducer
