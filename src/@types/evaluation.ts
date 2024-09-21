import { Competency } from './competency'
import { Employee } from './employee'

export type EvaluationPendingsResponse = {
  _id: string
  hierarchy: string
  evaluated_by: string
  employee: Employee
  competencies: Competency[]
  is_completed: boolean
  feedbacks: any[]
  updatedAt: string
}
