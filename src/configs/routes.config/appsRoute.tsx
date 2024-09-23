import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, MANAGER, EMPLOYEE } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const appsRoute: Routes = [
  {
    key: 'apps.dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    component: lazy(() => import('@/views/dashboard')),
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
    path: `${APP_PREFIX_PATH}/evaluations`,
    component: lazy(() => import('@/views/evaluation/EvaluationList')),
    authority: [ADMIN, MANAGER],
  },
  {
    key: 'apps.employee.list',
    path: `${APP_PREFIX_PATH}/employees`,
    component: lazy(() => import('@/views/employee/EmployeeList')),
    authority: [ADMIN, MANAGER],
  },
  {
    key: 'apps.competency.list',
    path: `${APP_PREFIX_PATH}/competencies`,
    component: lazy(() => import('@/views/competency/CompetencyList')),
    authority: [ADMIN],
  },
  {
    key: 'apps.evaluation.info',
    path: `${APP_PREFIX_PATH}/evaluations/info`,
    component: lazy(() => import('@/views/evaluation/EvaluationInfo')),
    authority: [ADMIN, MANAGER],
  },
]

export default appsRoute
