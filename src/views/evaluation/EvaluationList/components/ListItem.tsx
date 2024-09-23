import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import ProgressionBar from './ProgressionBar'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { EvaluationList } from '@/@types/evaluation'
import { useMemo } from 'react'
import EvaluatedBy from './EvaluatedBy'
import Employee from './Employee'
import Tag from '@/components/ui/Tag'
import { useAppDispatch } from '@/store'
import { evaluationActions } from '@/store/slices/evaluation'

type ListItemProps = {
  data: EvaluationList
  cardBorder?: boolean
}

const ListItem = ({ data, cardBorder }: ListItemProps) => {
  const dispatch = useAppDispatch()
  const total = useMemo(() => {
    return data.competencies.length * 5
  }, [data._id])

  const points = useMemo(() => {
    return data.feedbacks.reduce((acc, v) => acc + v.value, 0)
  }, [data._id])

  const progression = useMemo(() => {
    return Number(((points * 100) / total).toFixed(1))
  }, [total, points])

  const handleCurrent = () => {
    dispatch(evaluationActions.setCurrentEvaluationAction(data))
  }

  return (
    <div className="mb-4">
      <Card bordered={cardBorder}>
        <div className="grid gap-x-4 grid-cols-12">
          <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2 md:flex md:items-center">
            <Employee data={data.employee} handleCurrent={handleCurrent} />
          </div>
          <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2 md:flex md:items-center md:justify-end">
            <div className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-full">
              <HiOutlineClipboardCheck className="text-base" />
              <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                {points} / {total}
              </span>
            </div>
          </div>
          <div className="my-1 sm:my-0 col-span-12 md:col-span-2 lg:col-span-3 md:flex md:items-center">
            <ProgressionBar progression={progression} />
          </div>
          <div className="my-1 sm:my-0 col-span-12 md:col-span-3 lg:col-span-2 md:flex md:items-center">
            <EvaluatedBy data={data.evaluated_by} />
          </div>
          <div className="my-1 sm:my-0 col-span-12 md:col-span-2 lg:col-span-2 md:flex md:items-center">
            <Tag
              className={`text-white bg-${data.is_completed ? 'green' : 'yellow'}-600 border-0`}
            >
              {data.is_completed ? 'Completed' : 'Pending'}
            </Tag>
          </div>
          {!data.is_completed && (
            <div className="my-1 sm:my-0 col-span-12 sm:col-span-1 flex md:items-center justify-end">
              <ItemDropdown data={data} />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default ListItem
