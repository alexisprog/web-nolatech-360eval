import { Competency } from '@/@types/competency'
import ApiService from './ApiService'

export async function apiGetCompetencie() {
  return ApiService.fetchData<Competency[]>({
    url: `/competencies`,
    method: 'get',
  })
}
