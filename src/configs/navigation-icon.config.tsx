import {
  HiOutlineColorSwatch,
  HiOutlineDesktopComputer,
  HiOutlineTemplate,
  HiOutlineViewGridAdd,
  HiOutlineChartSquareBar,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiPencilAlt,
  HiOutlineShieldCheck,
  HiOutlineHashtag,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
  project: <HiOutlineChartSquareBar />,
  users: <HiOutlineUserCircle />,
  employees: <HiOutlineUserGroup />,
  evaluations: <HiPencilAlt />,
  competencies: <HiOutlineShieldCheck />,
  scales: <HiOutlineHashtag />,
  singleMenu: <HiOutlineViewGridAdd />,
  collapseMenu: <HiOutlineTemplate />,
  groupSingleMenu: <HiOutlineDesktopComputer />,
  groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon
