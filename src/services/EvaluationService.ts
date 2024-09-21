import { EvaluationPendingsResponse } from '@/@types/evaluation'
import ApiService from './ApiService'

export async function apiEvaluationPendings(evaluated_by: string) {
  return ApiService.fetchData<EvaluationPendingsResponse>({
    url: `/evaluations/pendings/${evaluated_by}`,
    method: 'get',
  })
}
