import { EvaluationList } from '@/@types/evaluation'
import EllipsisButton from '@/components/shared/EllipsisButton'
import Dropdown from '@/components/ui/Dropdown'
import { useAppDispatch } from '@/store'
import { evaluationActions } from '@/store/slices/evaluation'
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'

interface ItemDropdownProps {
  data: EvaluationList
}

const ItemDropdown = ({ data }: ItemDropdownProps) => {
  const dispatch = useAppDispatch()
  const handleEdit = () => {
    dispatch(evaluationActions.setCurrentEvaluationAction(data))
    dispatch(evaluationActions.toggleModal(true))
  }
  const handleDelete = () => {
    dispatch(evaluationActions.setEvaluationDeleteAction(data._id))
  }

  const dropdownList = [
    {
      label: 'Edit',
      value: 'edit',
      icon: <HiOutlinePencil />,
      action: () => handleEdit(),
    },
    {
      label: 'Delete',
      value: 'delete',
      icon: <HiOutlineTrash />,
      action: () => handleDelete(),
    },
  ]
  return (
    <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
      {dropdownList.map((item) => (
        <Dropdown.Item key={item.value} eventKey={item.value}>
          <span className="text-lg">{item.icon}</span>
          <span className="ml-2 rtl:mr-2" onClick={item.action}>
            {item.label}
          </span>
        </Dropdown.Item>
      ))}
    </Dropdown>
  )
}

export default ItemDropdown
