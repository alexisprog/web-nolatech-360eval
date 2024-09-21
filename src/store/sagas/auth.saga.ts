import { all, put, takeLatest } from 'redux-saga/effects'
import { sessionAction } from '../slices/auth/sessionSlice'
import { onError, safe } from '@/utils/functions-saga'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  ProfileResponse,
  SignInCredential,
  SignInResponse,
} from '@/@types/auth'
import { apiGetProfile, apiSignIn } from '@/services/AuthService'
import { commonActions } from '../slices/base/commonSlice'
import { userActions } from '../slices/auth'

function* singInSaga(action: PayloadAction<SignInCredential>) {
  const { data }: { data: SignInResponse } = yield apiSignIn(action.payload)
  yield put(sessionAction.signInSuccess(data))
  yield put(
    commonActions.setCommonNotification({
      visibility: true,
      title: 'Successfuly sing in',
      message: 'Welcome Evaluation 360',
    }),
  )
  const { data: dataProfile }: { data: ProfileResponse } = yield apiGetProfile()
  const { email, role } = dataProfile
  yield put(
    userActions.setUser({
      email,
      role: role.toUpperCase(),
      authority: [role.toUpperCase()],
      employee: dataProfile?.employee,
    }),
  )
}

export default all([
  takeLatest(sessionAction.singInAction.type, safe(onError(), singInSaga)),
])
