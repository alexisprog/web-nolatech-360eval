import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_EVALUATION_NAME } from './constants'
import { EvaluationCreateRequest, EvaluationList } from '@/@types/evaluation'

export type EvaluationListState = {
  loading: boolean
  data: EvaluationList[]
  currentEvaluation: EvaluationList | undefined
  visibleModal: boolean
}

const initialState: EvaluationListState = {
  loading: false,
  data: [],
  currentEvaluation: undefined,
  visibleModal: false,
}

export const evaluationSlice = createSlice({
  name: `${SLICE_EVALUATION_NAME}/list`,
  initialState,
  reducers: {
    getEvaluationsAction: (state) => {
      state.loading = true
    },
    getEvaluationsSuccessAction: (
      state,
      action: PayloadAction<EvaluationList[]>,
    ) => {
      state.loading = false
      state.data = action.payload
    },
    setFailedAction: (state) => {
      state.loading = false
    },
    setCurrentEvaluationAction: (
      state,
      action: PayloadAction<EvaluationList | undefined>,
    ) => {
      state.currentEvaluation = action.payload
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.visibleModal = action.payload
    },
    setEvaluationCreateAction: (
      state,
      action: PayloadAction<EvaluationCreateRequest>,
    ) => {
      state.loading = true
      action.payload
    },
    setEvaluationCreateSuccessAction: (state) => {
      state.loading = false
    },
    setEvaluationUpdateAction: (
      state,
      action: PayloadAction<{ id: string; data: EvaluationCreateRequest }>,
    ) => {
      state.loading = true
      action.payload
    },
    setEvaluationUpdateSuccessAction: (state) => {
      state.loading = false
    },
    setEvaluationDeleteAction: (state, action: PayloadAction<string>) => {
      state.loading = true
      action.payload
    },
    setEvaluationDeleteSuccessAction: (state) => {
      state.loading = false
    },
    resetStateEvaluations() {
      return initialState
    },
  },
})

export const evaluationActions = evaluationSlice.actions

export default evaluationSlice.reducer
