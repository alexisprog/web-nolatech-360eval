import { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import Spinner from '@/components/ui/Spinner'
import { useAppDispatch, useAppSelector } from '@/store'
import ListItem from './ListItem'
import { employeeActions } from '@/store/slices/employee'
import { competencyActions } from '@/store/slices/competency'

const EmployeeListContent = () => {
  const dispatch = useAppDispatch()
  const { loading, data } = useAppSelector((state) => state.competency)

  const fetchList = useCallback(() => {
    dispatch(competencyActions.getCompetenciesActions())
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
        data.map((competency) => (
          <ListItem key={competency._id} data={competency} />
        ))}
    </div>
  )
}

export default EmployeeListContent
