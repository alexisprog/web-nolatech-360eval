import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { Role } from '@/@types/auth'
import { Employee } from '@/@types/employee'

export type UserState = {
  email?: string
  authority?: string[]
  role?: string
  employee?: Employee
}

const initialState: UserState = {
  email: '',
  authority: [],
  role: Role.EMPLOYEE,
  employee: undefined,
}

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email
      state.authority = action.payload.authority
      state.role = action.payload.role
      state.employee = action.payload?.employee
    },
    resetStateUser() {
      return initialState
    },
  },
})

export const userActions = userSlice.actions

export const { setUser, resetStateUser } = userSlice.actions

export default userSlice.reducer
