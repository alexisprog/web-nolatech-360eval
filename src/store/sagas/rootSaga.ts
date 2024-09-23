import { all } from 'redux-saga/effects'
import authSaga from './auth.saga'
import evaluationSaga from './evaluation.saga'
import scaleSaga from './scale.saga'
import employeeSaga from './employee.saga'
import competencySaga from './competency.saga'

export function* rootSaga() {
  yield all([authSaga, evaluationSaga, scaleSaga, employeeSaga, competencySaga])
}
