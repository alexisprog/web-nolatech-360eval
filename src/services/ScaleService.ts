import ApiService from './ApiService'
import { ScaleResponse } from '@/@types/scale'

export async function apiGetScales() {
  return ApiService.fetchData<ScaleResponse>({
    url: `/scales`,
    method: 'get',
  })
}
