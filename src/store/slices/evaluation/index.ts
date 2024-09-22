import { combineReducers } from '@reduxjs/toolkit'
import pending, { EvaluationPendingsState } from './evaluationPendingsSlice'
import list, { EvaluationListState } from './evaluationSlice'

const reducer = combineReducers({
  pending,
  list,
})

export type EvaluationState = {
  pending: EvaluationPendingsState
  list: EvaluationListState
}

export * from './evaluationPendingsSlice'
export * from './evaluationSlice'

export default reducer
