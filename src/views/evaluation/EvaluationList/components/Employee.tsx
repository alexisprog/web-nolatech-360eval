import { Employee } from '@/@types/employee'
import { Link } from 'react-router-dom'

interface EmployeeByProps {
  data: Employee
}
const EmployeeComponent = ({ data }: EmployeeByProps) => {
  return (
    <div className="flex flex-col">
      <span>Evaluated:</span>
      <h6 className="font-bold">
        <Link to="/app/evaluations/info">
          {`${data.first_name} ${data.last_name}`}
        </Link>
      </h6>
      <span>{data.position}</span>
    </div>
  )
}

export default EmployeeComponent
