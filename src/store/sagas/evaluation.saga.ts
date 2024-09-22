import { all, call, put, takeLatest } from 'redux-saga/effects'
import { onError, safe } from '@/utils/functions-saga'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  evaluationActions,
  evaluationPendingActions,
} from '../slices/evaluation'
import {
  apiEvaluationCreate,
  apiEvaluationDelete,
  apiEvaluationFeedback,
  apiEvaluationPendings,
  apiEvaluationUpdate,
  apiGetEvaluations,
} from '@/services/EvaluationService'
import {
  EvaluationCreateRequest,
  EvaluationFeedbackRequest,
  EvaluationListResponse,
  EvaluationPendingsResponse,
} from '@/@types/evaluation'
import { commonActions } from '../slices/base'

function* getEvaluationsSaga() {
  const { data }: { data: EvaluationListResponse } = yield apiGetEvaluations()
  yield put(evaluationActions.getEvaluationsSuccessAction(data))
}

function* getEvaluationPendingsSaga(
  action: PayloadAction<{ evaluated_by: string }>,
) {
  const { data }: { data: EvaluationPendingsResponse[] } =
    yield apiEvaluationPendings(action.payload.evaluated_by)
  yield put(evaluationPendingActions.getEvaluationPendingsSuccessAction(data))
}

function* setEvaluationFeedbackSaga(
  action: PayloadAction<EvaluationFeedbackRequest>,
) {
  yield apiEvaluationFeedback(action.payload)
  yield put(evaluationPendingActions.setEvaluationFeedbackActionSuccessAction())
  yield put(
    commonActions.setCommonNotification({
      visibility: true,
      title: 'Successfuly feedback',
      message: 'Evaluation send success',
    }),
  )
}

function* setEvaluationCreateSaga(
  action: PayloadAction<EvaluationCreateRequest>,
) {
  yield apiEvaluationCreate(action.payload)
  yield put(evaluationActions.setEvaluationCreateSuccessAction())
  yield call(getEvaluationsSaga)
  yield put(
    commonActions.setCommonNotification({
      visibility: true,
      title: 'Successfuly Evaluation',
      message: 'Evaluation created success',
    }),
  )
}

function* setEvaluationUpdateSaga(
  action: PayloadAction<{ id: string; data: EvaluationCreateRequest }>,
) {
  yield apiEvaluationUpdate(action.payload.id, action.payload.data)
  yield put(evaluationActions.setEvaluationUpdateSuccessAction())
  yield call(getEvaluationsSaga)
  yield put(
    commonActions.setCommonNotification({
      visibility: true,
      title: 'Successfuly Evaluation',
      message: 'Evaluation updated success',
    }),
  )
}

function* setEvaluationDeleteSaga(action: PayloadAction<string>) {
  yield apiEvaluationDelete(action.payload)
  yield put(evaluationActions.setEvaluationDeleteSuccessAction())
  yield call(getEvaluationsSaga)
  yield put(
    commonActions.setCommonNotification({
      visibility: true,
      title: 'Successfuly Evaluation',
      message: 'Evaluation deleted success',
    }),
  )
}

export default all([
  takeLatest(
    evaluationActions.getEvaluationsAction.type,
    safe(onError(evaluationActions.setFailedAction()), getEvaluationsSaga),
  ),
  takeLatest(
    evaluationPendingActions.getEvaluationPendingsAction.type,
    safe(
      onError(evaluationPendingActions.setFailedAction()),
      getEvaluationPendingsSaga,
    ),
  ),
  takeLatest(
    evaluationPendingActions.setEvaluationFeedbackAction.type,
    safe(
      onError(evaluationPendingActions.setFailedAction()),
      setEvaluationFeedbackSaga,
    ),
  ),
  takeLatest(
    evaluationActions.setEvaluationCreateAction.type,
    safe(onError(evaluationActions.setFailedAction()), setEvaluationCreateSaga),
  ),
  takeLatest(
    evaluationActions.setEvaluationUpdateAction.type,
    safe(onError(evaluationActions.setFailedAction()), setEvaluationUpdateSaga),
  ),
  takeLatest(
    evaluationActions.setEvaluationDeleteAction.type,
    safe(onError(evaluationActions.setFailedAction()), setEvaluationDeleteSaga),
  ),
])
