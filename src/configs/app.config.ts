export type AppConfig = {
  apiPrefix: string
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  tourPath: string
  locale: string
}

const appConfig: AppConfig = {
  apiPrefix: import.meta.env.VITE_API_URL,
  authenticatedEntryPath: '/app/dashboard',
  unAuthenticatedEntryPath: '/sign-in',
  tourPath: '/',
  locale: 'en',
}

export default appConfig
