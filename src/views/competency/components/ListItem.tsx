import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import Column from './Column'
import { Competency } from '@/@types/competency'

type ListItemProps = {
  data: Competency
  cardBorder?: boolean
}

const ListItem = ({ data, cardBorder }: ListItemProps) => {
  return (
    <div className="mb-4">
      <Card bordered={cardBorder}>
        <div className="grid gap-x-4 grid-cols-12">
          <div className="my-1 sm:my-0 col-span-12 sm:col-span-8 md:col-span-8 lg:col-span-8 md:flex md:items-center">
            <Column header={data.competence} data={data.definition} />
          </div>
          <div className="my-1 sm:my-0 col-span-12 sm:col-span-1 lg:col-span-1 flex md:items-center md:items-center justify-end">
            <Tag
              className={`text-white bg-${data.is_disabled ? 'red' : 'green'}-600 border-0 h-7`}
            >
              {data.is_disabled ? 'disabled' : 'enabled'}
            </Tag>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ListItem
