import { Avatar, Tag } from '@/components/ui'
import dayjs from 'dayjs'
import type { ComponentPropsWithoutRef } from 'react'
import { HiOutlineUser } from 'react-icons/hi'

interface FormDesriptionProps extends ComponentPropsWithoutRef<'div'> {
  title: string
  desc: string
  name: string
  dni: string
  hierarchy: string
  position: string
  updatedAt: string
}

const FormDesription = ({
  title,
  desc,
  name,
  dni,
  hierarchy,
  position,
  updatedAt,
  ...rest
}: FormDesriptionProps) => {
  return (
    <div {...rest}>
      <h5>{title}</h5>
      <p>{desc}</p>

      <h5 className={'mt-5'}>Employee info:</h5>
      <div className={'flex items-center gap-2 mt-2 mb-5'}>
        <div className={'flex items-center gap-2 mr-5'}>
          <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
          <div>
            <div className="font-bold capitalize">{name}</div>
            <div>DNI: {dni}</div>
          </div>
        </div>
        <div className={'flex flex-row items-center gap-2 mr-5'}>
          <p className="font-bold">Hierarchy: </p>
          <Tag className="text-white bg-indigo-600 border-0">{hierarchy}</Tag>
        </div>
        <div className={'flex flex-row items-center gap-2 mr-5'}>
          <p className="font-bold">Position: </p>
          <p>{position}</p>
        </div>
        <div className={'flex flex-row items-center gap-2 mr-5'}>
          <p className="font-bold">Date: </p>
          <p>{dayjs(updatedAt).format('YYYY/MM/DD HH:mm')}</p>
        </div>
      </div>
    </div>
  )
}

export default FormDesription
