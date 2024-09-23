import ActionBar from './components/ActionBar'
import EvaluationListContent from './components/EvaluationListContent'
import NewEvaluationModal from './components/NewEvaluationModal'
import Container from '@/components/shared/Container'

const EvaluationList = () => {
  return (
    <Container className="h-full">
      <ActionBar />
      <EvaluationListContent />
      <NewEvaluationModal />
    </Container>
  )
}

export default EvaluationList
