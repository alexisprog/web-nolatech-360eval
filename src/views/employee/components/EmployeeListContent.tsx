import { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import Spinner from '@/components/ui/Spinner'
import { useAppDispatch, useAppSelector } from '@/store'
import ListItem from './ListItem'
import { employeeActions } from '@/store/slices/employee'

const EmployeeListContent = () => {
  const dispatch = useAppDispatch()
  const { loading, data } = useAppSelector((state) => state.employee)

  const fetchList = useCallback(() => {
    dispatch(employeeActions.getEmployeesActions())
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
        data.map((employee) => <ListItem key={employee._id} data={employee} />)}
    </div>
  )
}

export default EmployeeListContent
