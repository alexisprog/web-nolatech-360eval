import { Competency } from './competency'
import { Employee } from './employee'

export type EvaluationPendingsResponse = {
  _id: string
  hierarchy: string
  evaluated_by: string
  employee: Employee
  competencies: Competency[]
  is_completed: boolean
  feedbacks: Feedback[]
  updatedAt: string
}

export type EvaluationFeedbackRequest = {
  evaluation_id: string
  feedbacks: Feedback[]
}

export type EvaluationCreateRequest = {
  hierarchy: string
  evaluated_by: string
  employee: string
  competencies: string[]
}

export type EvaluationListResponse = EvaluationList[]

export interface EvaluationList {
  _id: string
  hierarchy: string
  evaluated_by: Employee
  employee: Employee
  competencies: Competency[]
  is_completed: boolean
  feedbacks: Feedback[]
  createdAt: string
  updatedAt: string
}
export interface Feedback {
  competency: string
  value: number
}
