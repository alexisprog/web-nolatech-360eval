import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SCHEMA_ROLE, SLICE_BASE_NAME } from './constants'
import { TypeAttributes } from '@/components/ui/@types/common'
import { NotificationPlacement } from '@/components/ui/@types/placement'

export interface NotificationAlert {
  visibility: boolean
  title: string
  message: string
  type?: TypeAttributes.Status | undefined
  placement?: NotificationPlacement | undefined
  duration?: number | undefined
}

export type CommonState = {
  currentRouteKey: string
  roles: SCHEMA_ROLE[]
  loading: boolean
  notification: NotificationAlert
}

const defaultMessage = {
  visibility: false,
  title: '',
  message: '',
  type: 'danger' as TypeAttributes.Status,
}

export const initialState: CommonState = {
  currentRouteKey: '',
  roles: [],
  loading: true,
  notification: defaultMessage,
}

export const commonSlice = createSlice({
  name: `${SLICE_BASE_NAME}/common`,
  initialState,
  reducers: {
    setCurrentRouteKey: (state, action: PayloadAction<string>) => {
      state.currentRouteKey = action.payload
    },
    getRoles: (state) => {
      state.loading = true
    },
    setRoles: (state, action: PayloadAction<SCHEMA_ROLE[]>) => {
      state.roles = action.payload
      state.loading = false
    },
    commonFailed: (state) => {
      state.loading = false
    },
    setCommonNotification: (
      state,
      action: PayloadAction<NotificationAlert>,
    ) => {
      state.notification = action.payload
    },
    hidenCommonNotification: (state) => {
      state.notification = defaultMessage
    },
  },
})

export const commonActions = commonSlice.actions

export const { setCurrentRouteKey, setCommonNotification } = commonSlice.actions

export default commonSlice.reducer
