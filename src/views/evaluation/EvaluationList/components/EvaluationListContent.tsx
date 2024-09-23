import { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import ListItem from './ListItem'
import Spinner from '@/components/ui/Spinner'
import { useAppDispatch, useAppSelector } from '@/store'
import { evaluationActions } from '@/store/slices/evaluation'

const EvaluationListContent = () => {
  const dispatch = useAppDispatch()
  const { loading, data } = useAppSelector((state) => state.evaluation.list)

  const fetchList = useCallback(() => {
    dispatch(evaluationActions.getEvaluationsAction())
  }, [dispatch])

  useEffect(() => {
    fetchList()
  }, [])

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
      {data?.length > 0 &&
        !loading &&
        data.map((evaluation) => (
          <ListItem key={evaluation._id} data={evaluation} />
        ))}
    </div>
  )
}

export default EvaluationListContent
