import {
  EvaluationCreateRequest,
  EvaluationFeedbackRequest,
  EvaluationList,
  EvaluationListResponse,
  EvaluationPendingsResponse,
} from '@/@types/evaluation'
import ApiService from './ApiService'

export async function apiEvaluationPendings(evaluated_by: string) {
  return ApiService.fetchData<EvaluationPendingsResponse>({
    url: `/evaluations/pendings/${evaluated_by}`,
    method: 'get',
  })
}

export async function apiEvaluationFeedback(data: EvaluationFeedbackRequest) {
  return ApiService.fetchData<EvaluationPendingsResponse>({
    url: `/evaluations/feedback`,
    method: 'post',
    data,
  })
}

export async function apiEvaluationCreate(data: EvaluationCreateRequest) {
  return ApiService.fetchData<EvaluationList>({
    url: `/evaluations`,
    method: 'post',
    data,
  })
}

export async function apiEvaluationUpdate(
  id: string,
  data: EvaluationCreateRequest,
) {
  return ApiService.fetchData<EvaluationList>({
    url: `/evaluations/${id}`,
    method: 'patch',
    data,
  })
}

export async function apiGetEvaluations() {
  return ApiService.fetchData<EvaluationListResponse>({
    url: `/evaluations`,
    method: 'get',
  })
}

export async function apiEvaluationDelete(id: string) {
  return ApiService.fetchData<EvaluationList>({
    url: `/evaluations/${id}`,
    method: 'delete',
  })
}
