import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

type FormDataCompatibleRequest = Record<string, unknown> | FormData

const ApiService = {
  async fetchData<Response = unknown, Request = FormDataCompatibleRequest>(
    param: AxiosRequestConfig<Request>,
  ): Promise<AxiosResponse<Response>> {
    if (param.data instanceof FormData) {
      param.headers = {
        ...param.headers,
        'Content-Type': 'multipart/form-data',
      }
    }

    try {
      const response: AxiosResponse<Response> = await BaseService(param)
      return response
    } catch (error) {
      throw error as AxiosError
    }
  },
}

export default ApiService
