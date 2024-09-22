import ApiService from './ApiService'
import { Employee } from '@/@types/employee'

export async function apiGetEmployees() {
  return ApiService.fetchData<Employee[]>({
    url: `/employees`,
    method: 'get',
  })
}
