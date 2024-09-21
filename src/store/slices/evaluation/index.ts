import { combineReducers } from '@reduxjs/toolkit'
import pending, { EvaluationPendingsState } from './evaluationPendingsSlice'

const reducer = combineReducers({
  pending,
})

export type EvaluationState = {
  pending: EvaluationPendingsState
}

export * from './evaluationPendingsSlice'

export default reducer
