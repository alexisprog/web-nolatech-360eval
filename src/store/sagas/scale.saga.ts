import { all, put, takeLatest } from 'redux-saga/effects'
import { onError, safe } from '@/utils/functions-saga'
import { ScaleResponse } from '@/@types/scale'
import { apiGetScales } from '@/services/ScaleService'
import { scaleActions } from '../slices/scale'

function* getScalesSaga() {
  const { data }: { data: ScaleResponse } = yield apiGetScales()
  yield put(scaleActions.setScales(data))
}

export default all([
  takeLatest(
    scaleActions.getScalesAction.type,
    safe(onError(scaleActions.setFailedAction()), getScalesSaga),
  ),
])
