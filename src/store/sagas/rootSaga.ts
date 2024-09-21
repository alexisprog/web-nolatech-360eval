import { all } from 'redux-saga/effects'
import authSaga from './auth.saga'
import evaluationSaga from './evaluation.saga'

export function* rootSaga() {
  yield all([authSaga, evaluationSaga])
}
