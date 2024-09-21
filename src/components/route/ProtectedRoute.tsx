import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/store/hook'

const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = () => {
  const signedIn = useAppSelector((state) => state.auth.session.signedIn)
  if (!signedIn) {
    return (
      <Navigate
        replace
        to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=/app/dashboard`}
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
