import ApiService from './ApiService'
import type {
  SignInCredential,
  SignUpRequest,
  SignInResponse,
  SignUpResponse,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
  return ApiService.fetchData<SignInResponse>({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export async function apiSignUp(data: SignUpRequest) {
  return ApiService.fetchData<SignUpResponse>({
    url: '/auth/register',
    method: 'post',
    data,
  })
}
