import { Role } from '@/@types/auth'
import { useAppSelector } from '@/store'
import DashEmployee from './DashEmployee'

const Dashboard = () => {
  const role = useAppSelector((state) => state.auth.user.role)
  return role === Role.EMPLOYEE ? <DashEmployee /> : <div></div>
}

export default Dashboard
