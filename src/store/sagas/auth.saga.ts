import { all, put, takeLatest } from 'redux-saga/effects'
import { sessionAction } from '../slices/auth/sessionSlice'
import { onError, safe } from '@/utils/functions-saga'
import { PayloadAction } from '@reduxjs/toolkit'
import { SignInCredential, SignInResponse, SignUpRequest } from '@/@types/auth'
import { apiSignIn, apiSignUp } from '@/services/AuthService'
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
  yield put(
    userActions.setUser({
      email: data.user.email,
      role: data.user.role.toUpperCase(),
      authority: [data.user.role.toUpperCase()],
      employee: data.user?.employee,
    }),
  )
}

function* singUpSaga(action: PayloadAction<SignUpRequest>) {
  yield apiSignUp(action.payload)
  const { data }: { data: SignInResponse } = yield apiSignIn({
    email: action.payload.email,
    password: action.payload.password,
  })
  yield put(sessionAction.signInSuccess(data))
  yield put(
    commonActions.setCommonNotification({
      visibility: true,
      title: 'Successfuly sing up',
      message: 'Welcome Evaluation 360',
    }),
  )
  yield put(
    userActions.setUser({
      email: data.user.email,
      role: data.user.role.toUpperCase(),
      authority: [data.user.role.toUpperCase()],
      employee: data.user?.employee,
    }),
  )
}

export default all([
  takeLatest(sessionAction.singInAction.type, safe(onError(), singInSaga)),
  takeLatest(sessionAction.singUpAction.type, safe(onError(), singUpSaga)),
])
