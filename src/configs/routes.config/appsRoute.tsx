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
  {
    key: 'apps.evaluation.feedback',
    path: `${APP_PREFIX_PATH}/evaluation/feedback`,
    component: lazy(() => import('@/views/evaluation/EvaluationFeedback')),
    authority: [EMPLOYEE],
  },
  {
    key: 'apps.evaluations.list',
    path: `${APP_PREFIX_PATH}/evaluations/list`,
    component: lazy(() => import('@/views/evaluation/EvaluationList')),
    authority: [ADMIN, MANAGER],
  },
]

export default appsRoute
