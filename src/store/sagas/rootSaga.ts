import { all } from 'redux-saga/effects'
import authSaga from './auth.saga'
import evaluationSaga from './evaluation.saga'
import scaleSaga from './scale.saga'

export function* rootSaga() {
  yield all([authSaga, evaluationSaga, scaleSaga])
}
