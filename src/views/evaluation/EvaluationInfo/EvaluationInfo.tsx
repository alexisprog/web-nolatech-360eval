import Container from '@/components/shared/Container'
import ActionBar from './components/ActionBar'
import EvaluationInfoContent from './components/EvaluationInfoContent'

const EvaluationInfo = () => {
  return (
    <Container className="h-full">
      <ActionBar />
      <EvaluationInfoContent />
    </Container>
  )
}

export default EvaluationInfo
