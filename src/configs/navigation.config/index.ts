import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_TITLE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { ADMIN, EMPLOYEE, MANAGER } from '@/constants/roles.constant'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

const navigationConfig: NavigationTree[] = [
  {
    key: 'apps',
    path: '',
    title: 'Menu',
    icon: '',
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, MANAGER, EMPLOYEE],
    subMenu: [
      {
        key: 'apps.dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        title: 'Dashboard',
        icon: 'project',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, MANAGER, EMPLOYEE],
        subMenu: [],
      },
      {
        key: 'apps.employees',
        path: `${APP_PREFIX_PATH}/employees`,
        title: 'Employees',
        icon: 'employees',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
      },
      {
        key: 'apps.competencies',
        path: `${APP_PREFIX_PATH}/competencies`,
        title: 'Competencies',
        icon: 'competencies',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
      },
      {
        key: 'apps.evaluations',
        path: `${APP_PREFIX_PATH}/evaluations`,
        title: 'Evaluations',
        icon: 'evaluations',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, MANAGER],
        subMenu: [],
      },
    ],
  },
]

export default navigationConfig
