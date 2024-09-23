import Container from '@/components/shared/Container'
import CompetencyListContent from './components/CompetencyListContent'
import ActionBar from './components/ActionBar'

const CompetencyList = () => {
  return (
    <Container className="h-full">
      <ActionBar />
      <CompetencyListContent />
    </Container>
  )
}

export default CompetencyList
