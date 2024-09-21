/* eslint-disable @typescript-eslint/no-explicit-any */
import { commonActions } from '@/store'
import { AxiosError } from 'axios'
import { call, put } from 'redux-saga/effects'

type ErrorResponse = {
  errorCode: number
  message: string
  status: number
  errors?: {
    message: string
  }[]
}

export const safe = (handler: any = null, saga: any, ...args: any) =>
  function* (action: any) {
    try {
      yield call(saga, ...args, action)
    } catch (err) {
      yield call(handler(err))
    }
  }

export const onError = (callbackError?: any) => (err: any) =>
  function* () {
    const error = err as AxiosError
    const message =
      (error?.response?.data as ErrorResponse)?.message ||
      (error?.response?.data as ErrorResponse)?.errors?.[0]?.message ||
      error?.message ||
      'Network error'
    yield put(
      commonActions.setCommonNotification({
        type: 'danger',
        title: 'Error',
        message,
        visibility: true,
      }),
    )
    if (callbackError) yield put(callbackError(message))
  }
