import { useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import Spinner from '@/components/ui/Spinner'
import { useAppDispatch, useAppSelector } from '@/store'
import { competencyActions } from '@/store/slices/competency'
import ListItem from './ListItem'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'

const EvaluationInfoContent = () => {
  const dispatch = useAppDispatch()
  const { loading, data: competencies } = useAppSelector(
    (state) => state.competency,
  )
  const { currentEvaluation } = useAppSelector((state) => state.evaluation.list)

  const average = useMemo(() => {
    if (!currentEvaluation?.feedbacks) {
      return 0
    }

    const total = currentEvaluation.feedbacks.length
    const sum = currentEvaluation.feedbacks.reduce((acc, v) => acc + v.value, 0)
    return Number((sum / total).toFixed(1))
  }, [currentEvaluation?.feedbacks])

  const fetchList = useCallback(() => {
    dispatch(competencyActions.getCompetenciesActions())
  }, [dispatch])

  useEffect(() => {
    fetchList()
  }, [])

  if (!currentEvaluation?.feedbacks) {
    return <div></div>
  }

  return (
    <div
      className={classNames(
        'mt-6 h-full flex flex-col',
        loading && 'justify-center',
      )}
    >
      {loading && (
        <div className="flex justify-center">
          <Spinner size={40} />
        </div>
      )}
      {currentEvaluation?.feedbacks.map((feedback) => {
        const competency = competencies.find(
          (c) => c._id === feedback.competency,
        )
        return !competency ? (
          <></>
        ) : (
          <ListItem
            key={competency._id}
            data={competency}
            value={feedback.value}
          />
        )
      })}
      {currentEvaluation?.feedbacks?.length > 0 && (
        <div className="mb-4">
          <Card bordered>
            <div className="grid gap-x-4 grid-cols-12">
              <div className="my-1 sm:my-0 col-span-12 sm:col-span-8 md:col-span-8 lg:col-span-8 md:flex md:items-center">
                <h6>Average:</h6>
              </div>
              <div className="my-1 sm:my-0 col-span-12 sm:col-span-1 lg:col-span-1 flex md:items-center md:items-center justify-end">
                <Tag className={`text-white bg-indigo-600 border-0 h-7`}>
                  {average}
                </Tag>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default EvaluationInfoContent
