import { all, put, takeLatest } from 'redux-saga/effects'
import { onError, safe } from '@/utils/functions-saga'
import { competencyActions } from '../slices/competency'
import { Competency } from '@/@types/competency'
import { apiGetCompetencie } from '@/services/CompentencyService'

function* getCompetenciesSaga() {
  const { data }: { data: Competency[] } = yield apiGetCompetencie()
  yield put(competencyActions.getCompetenciesSuccessActions(data))
}

export default all([
  takeLatest(
    competencyActions.getCompetenciesActions.type,
    safe(onError(competencyActions.setFailedAction()), getCompetenciesSaga),
  ),
])
