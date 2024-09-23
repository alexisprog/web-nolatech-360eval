interface ColumnProps {
  header: string
  data: string
}
const Column = ({ header, data }: ColumnProps) => {
  return (
    <div className="flex flex-col">
      <h6 className="font-bold">{header}</h6>
      <span>{data}</span>
    </div>
  )
}

export default Column
