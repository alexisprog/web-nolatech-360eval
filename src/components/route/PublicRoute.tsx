import { Navigate, Outlet } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import { useAppSelector } from '@/store/hook'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
  const signedIn = useAppSelector((state) => state.auth.session.signedIn)
  return signedIn ? <Navigate to={authenticatedEntryPath} /> : <Outlet />
}

export default PublicRoute
