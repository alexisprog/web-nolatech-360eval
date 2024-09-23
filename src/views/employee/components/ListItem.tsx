import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import Column from './Column'
import { Employee } from '@/@types/employee'

type ListItemProps = {
  data: Employee
  cardBorder?: boolean
}

const ListItem = ({ data, cardBorder }: ListItemProps) => {
  return (
    <div className="mb-4">
      <Card bordered={cardBorder}>
        <div className="grid gap-x-4 grid-cols-12">
          <div className="my-1 sm:my-0 col-span-12 sm:col-span-3 md:col-span-3 lg:col-span-2 md:flex md:items-center">
            <Column header="DNI:" data={data.dni} />
          </div>
          <div className="my-1 sm:my-0 col-span-12 sm:col-span-3 md:col-span-3 lg:col-span-2 md:flex md:items-center">
            <Column header="First Name:" data={data.first_name} />
          </div>
          <div className="my-1 sm:my-0 col-span-12 md:col-span-3 lg:col-span-3 md:flex md:items-center">
            <Column header="Last Name:" data={data.last_name} />
          </div>
          <div className="my-1 sm:my-0 col-span-12 sm:col-span-3 lg:col-span-3 flex flex-col md:items-center md:items-center justify-end">
            <h6>Position:</h6>
            <Tag className={`text-white bg-indigo-600 border-0 mt-2`}>
              {data.position}
            </Tag>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ListItem
