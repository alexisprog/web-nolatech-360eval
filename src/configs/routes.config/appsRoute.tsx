import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, MANAGER, EMPLOYEE } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const appsRoute: Routes = [
  {
    key: 'apps.dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    component: lazy(() => import('@/views/Home')),
    authority: [ADMIN, EMPLOYEE, MANAGER],
  },
]

export default appsRoute
