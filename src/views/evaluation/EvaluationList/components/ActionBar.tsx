import Button from '@/components/ui/Button'
import { useAppDispatch } from '@/store'
import { evaluationActions } from '@/store/slices/evaluation'
import { HiOutlinePlusCircle } from 'react-icons/hi'

const ActionBar = () => {
  const dispatch = useAppDispatch()
  const onAddNewEvaluation = () => {
    dispatch(evaluationActions.setCurrentEvaluationAction(undefined))
    dispatch(evaluationActions.toggleModal(true))
  }

  return (
    <div className="lg:flex items-center justify-between mb-4">
      <h3 className="mb-4 lg:mb-0">Evaluation List</h3>
      <div className="flex flex-col md:flex-row md:items-center gap-1">
        <Button
          size="sm"
          variant="twoTone"
          icon={<HiOutlinePlusCircle />}
          onClick={onAddNewEvaluation}
        >
          New Evaluation
        </Button>
      </div>
    </div>
  )
}

export default ActionBar
