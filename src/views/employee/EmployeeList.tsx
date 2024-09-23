import Container from '@/components/shared/Container'
import EmployeeListContent from './components/EmployeeListContent'
import ActionBar from './components/ActionBar'

const EmployeeList = () => {
  return (
    <Container className="h-full">
      <ActionBar />
      <EmployeeListContent />
    </Container>
  )
}

export default EmployeeList
