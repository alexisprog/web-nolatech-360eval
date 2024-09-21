import axios, { AxiosError } from 'axios'
import appConfig from '@/configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api.constant'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import store, { signOutSuccess } from '../store'

const unauthorizedCode = [401]

const BaseService = axios.create({
  baseURL: appConfig.apiPrefix,
})

interface PersistedAuthData {
  auth: {
    session: {
      token: string
    }
  }
}

BaseService.interceptors.request.use(
  (config) => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson<PersistedAuthData>(rawPersistData)

    let accessToken: string | null = persistData?.auth?.session?.token

    if (!accessToken) {
      const { auth } = store.getState()
      accessToken = auth.session.token
    }

    if (accessToken) {
      config.headers![REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`
    }

    config.headers['a']
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(signOutSuccess())
    }

    return Promise.reject(error)
  },
)

export default BaseService
