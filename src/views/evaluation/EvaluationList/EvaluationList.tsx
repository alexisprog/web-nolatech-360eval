import ActionBar from './components/ActionBar'
import ProjectListContent from './components/ProjectListContent'
import NewEvaluationModal from './components/NewEvaluationModal'
import Container from '@/components/shared/Container'

const EvaluationList = () => {
  return (
    <Container className="h-full">
      <ActionBar />
      <ProjectListContent />
      <NewEvaluationModal />
    </Container>
  )
}

export default EvaluationList
