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
  user: User
}

export type SignUpResponse = {
  email: string
}

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

export interface User {
  _id: string
  email: string
  role: string
  employee: Employee
}
