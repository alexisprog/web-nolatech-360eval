import { all, put, takeLatest } from 'redux-saga/effects'
import { onError, safe } from '@/utils/functions-saga'
import { PayloadAction } from '@reduxjs/toolkit'
import { evaluationPendingActions } from '../slices/evaluation'
import { apiEvaluationPendings } from '@/services/EvaluationService'
import { EvaluationPendingsResponse } from '@/@types/evaluation'

function* getEvaluationPendingsSaga(
  action: PayloadAction<{ evaluated_by: string }>,
) {
  const { data }: { data: EvaluationPendingsResponse[] } =
    yield apiEvaluationPendings(action.payload.evaluated_by)
  yield put(evaluationPendingActions.getEvaluationPendingsSuccessAction(data))
}

export default all([
  takeLatest(
    evaluationPendingActions.getEvaluationPendingsAction.type,
    safe(
      onError(evaluationPendingActions.setFailedAction()),
      getEvaluationPendingsSaga,
    ),
  ),
])
