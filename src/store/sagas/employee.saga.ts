import { all, put, takeLatest } from 'redux-saga/effects'
import { onError, safe } from '@/utils/functions-saga'
import { employeeActions } from '../slices/employee'
import { apiGetEmployees } from '@/services/EmployeeService'
import { Employee } from '@/@types/employee'

function* getEmployeesSaga() {
  const { data }: { data: Employee[] } = yield apiGetEmployees()
  yield put(employeeActions.getEmployeesSuccessActions(data))
}

export default all([
  takeLatest(
    employeeActions.getEmployeesActions.type,
    safe(onError(employeeActions.setFailedAction()), getEmployeesSaga),
  ),
])
