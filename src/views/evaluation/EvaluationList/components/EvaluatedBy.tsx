import { Employee } from '@/@types/employee'

interface EvaluatedByProps {
  data: Employee
}
const EvaluatedBy = ({ data }: EvaluatedByProps) => {
  return (
    <div className="flex flex-col">
      <span>Evaluated By:</span>
      <h6 className="font-bold">{`${data.first_name} ${data.last_name}`}</h6>
      <span>{data.position}</span>
    </div>
  )
}

export default EvaluatedBy
