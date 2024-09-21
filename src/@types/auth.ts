import { Employee } from './employee'

export type SignInCredential = {
  email: string
  password: string
}

export type SignUpRequest = {
  dni: string
  first_name: string
  last_name: string
  position: string
  email: string
  password: string
}

export type SignInResponse = {
  token: string
}

export type SignUpResponse = {
  email: string
}

export type ProfileResponse = {
  _id: string
  email: string
  role: string
  employee: Employee
}

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}
