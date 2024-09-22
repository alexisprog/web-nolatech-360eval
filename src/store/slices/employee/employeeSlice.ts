import { Employee } from '@/@types/employee'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type EmployeeState = {
  loading: boolean
  data: Employee[]
}

const initialState: EmployeeState = {
  loading: false,
  data: [],
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployeesActions: (state) => {
      state.loading = true
    },
    getEmployeesSuccessActions: (state, action: PayloadAction<Employee[]>) => {
      state.loading = false
      state.data = action.payload
    },
    setFailedAction: (state) => {
      state.loading = false
    },
  },
})

export const employeeActions = employeeSlice.actions

export default employeeSlice.reducer
