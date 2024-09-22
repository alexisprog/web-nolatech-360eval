import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_EVALUATION_NAME } from './constants'
import { EvaluationPendingsResponse } from '@/@types/evaluation'

export type EvaluationPendingsState = {
  loading: boolean
  pendings: EvaluationPendingsResponse[]
  currentPending: EvaluationPendingsResponse | undefined
}

export const initialState: EvaluationPendingsState = {
  loading: false,
  pendings: [],
  currentPending: undefined,
}

export const evaluationPendingSlice = createSlice({
  name: `${SLICE_EVALUATION_NAME}/employee`,
  initialState,
  reducers: {
    getEvaluationPendingsAction: (
      state,
      action: PayloadAction<{ evaluated_by: string }>,
    ) => {
      state.loading = true
      action.payload
    },
    getEvaluationPendingsSuccessAction: (
      state,
      action: PayloadAction<EvaluationPendingsResponse[]>,
    ) => {
      state.loading = false
      state.pendings = action.payload
    },
    setFailedAction: (state) => {
      state.loading = false
    },
    setCurrentPendingAction: (
      state,
      action: PayloadAction<EvaluationPendingsResponse>,
    ) => {
      state.currentPending = action.payload
    },
    resetStateEvaluationPendings() {
      return initialState
    },
  },
})

export const evaluationPendingActions = evaluationPendingSlice.actions

export default evaluationPendingSlice.reducer
