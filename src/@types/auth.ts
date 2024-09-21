export type SignInCredential = {
  userName: string
  password: string
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
  userName: string
  email: string
  password: string
}

export type ForgotPassword = {
  email: string
}

export type ResetPassword = {
  password: string
}

export type SignInResponse = {
  status: number
  data: LoginDataResponse
}

export type LoginDataResponse = {
  _id: string
  userName: string
  firstName: string
  lastName: string
  email: string
  birthDate: string
  password: string
  isTwoFactorAuthenticationEnabled: boolean
  refreshToken: string
  isActive: boolean
  language: string
  role: number
  isFirstLogin: boolean
  isEmailActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
  accessToken: string
}
