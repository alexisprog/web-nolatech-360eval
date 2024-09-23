import {
  HiOutlineColorSwatch,
  HiOutlineDesktopComputer,
  HiOutlineTemplate,
  HiOutlineViewGridAdd,
  HiOutlineChartSquareBar,
  HiOutlineUserGroup,
  HiPencilAlt,
  HiOutlineShieldCheck,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
  project: <HiOutlineChartSquareBar />,
  employees: <HiOutlineUserGroup />,
  evaluations: <HiPencilAlt />,
  competencies: <HiOutlineShieldCheck />,
  singleMenu: <HiOutlineViewGridAdd />,
  collapseMenu: <HiOutlineTemplate />,
  groupSingleMenu: <HiOutlineDesktopComputer />,
  groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon
