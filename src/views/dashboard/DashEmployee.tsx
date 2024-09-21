import { useAppDispatch, useAppSelector } from '@/store'
import DashboardHeader from './components/DashboardHeader'
import Loading from '@/components/shared/Loading'
import { useEffect } from 'react'
import { evaluationPendingActions } from '@/store/slices/evaluation'
import CardEvaluation from './components/CardEvaluation'

const DashEmployee = () => {
  const dispatch = useAppDispatch()
  const employee = useAppSelector((state) => state.auth.user.employee)
  const { loading, pendings } = useAppSelector(
    (state) => state.evaluation.pending,
  )

  useEffect(() => {
    if (!employee?._id) {
      return
    }
    dispatch(
      evaluationPendingActions.getEvaluationPendingsAction({
        evaluated_by: employee?._id,
      }),
    )
  }, [employee?._id])

  return (
    <div className="flex flex-col gap-4 h-full">
      <Loading loading={loading}>
        <DashboardHeader
          title="Evaluation 360"
          subtitle="Here you will find the evaluations that you have pending to carry out"
        />
        <div className="flex flex-col xl:flex-row gap-4 mt-5">
          <div className="flex flex-col gap-4 flex-auto">
            {pendings.map((pending, index) => {
              return (
                <CardEvaluation
                  key={index}
                  name={`${pending.employee.first_name} ${pending.employee.last_name}`}
                  dni={pending.employee.dni}
                  hierarchy={pending.hierarchy}
                  position={pending.employee.position}
                  updatedAt={pending.updatedAt}
                />
              )
            })}
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default DashEmployee
