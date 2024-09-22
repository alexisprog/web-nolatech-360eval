import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
import { HiOutlineUser } from 'react-icons/hi'
import dayjs from 'dayjs'
import Tag from '@/components/ui/Tag'

interface CardEvaluationProps {
  name: string
  dni: string
  hierarchy: string
  position: string
  updatedAt: string
  onClick: () => void
}

const CardEvaluation = ({
  name,
  dni,
  hierarchy,
  position,
  updatedAt,
  onClick,
}: CardEvaluationProps) => {
  return (
    <div className="max-w-xs">
      <Card
        clickable
        className="hover:shadow-lg transition duration-150 ease-in-out"
        onClick={onClick}
      >
        <div className={'flex items-center gap-2 mb-5'}>
          <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
          <div>
            <div className="font-bold capitalize">{name}</div>
            <div>DNI: {dni}</div>
          </div>
        </div>
        <div className={'flex flex-row items-center gap-2 mb-2'}>
          <p className="font-bold">Hierarchy: </p>
          <Tag className="text-white bg-indigo-600 border-0">{hierarchy}</Tag>
        </div>
        <div className={'flex flex-row items-center gap-2 mb-2'}>
          <p className="font-bold">Position: </p>
          <p>{position}</p>
        </div>
        <div className={'flex flex-row items-center gap-2 mb-2'}>
          <p className="font-bold">Date: </p>
          <p>{dayjs(updatedAt).format('YYYY/MM/DD HH:mm')}</p>
        </div>
      </Card>
    </div>
  )
}

export default CardEvaluation
