import Dialog from '@/components/ui/Dialog'
import EvaluationForm from './EvaluationForm'
import { useAppDispatch, useAppSelector } from '@/store'
import { evaluationActions } from '@/store/slices/evaluation'

const NewEvaluationModal = () => {
  const dispatch = useAppDispatch()

  const { visibleModal, currentEvaluation } = useAppSelector(
    (state) => state.evaluation.list,
  )

  const onDialogClose = () => {
    dispatch(evaluationActions.toggleModal(false))
  }

  return (
    <Dialog
      isOpen={visibleModal}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h4>{`${currentEvaluation?._id ? 'Edit' : 'Create new'} evaluation`}</h4>
      <div className="mt-4">
        <EvaluationForm />
      </div>
    </Dialog>
  )
}

export default NewEvaluationModal
