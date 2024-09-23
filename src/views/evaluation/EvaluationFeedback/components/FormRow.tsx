import classNames from 'classnames'
import { FormItem } from '@/components/ui/Form'
import type { PropsWithChildren } from 'react'

type FormRow<T> = PropsWithChildren<{
  title: string
  subtitle: string
  border?: boolean
  alignCenter?: boolean
}>

const FormRow = <T extends Record<string, unknown>>(props: FormRow<T>) => {
  const { title, subtitle, children, border = true, alignCenter = true } = props

  return (
    <div
      className={classNames(
        'grid md:grid-cols-3 gap-4 py-8',
        border && 'border-b border-gray-200 dark:border-gray-600',
        alignCenter && 'items-center',
      )}
    >
      <div className="col-span-2">
        <div className="font-bold">{title}</div>
        <p>{subtitle}</p>
      </div>
      <div>
        <FormItem className="mb-0 max-w-[300px]">{children}</FormItem>
      </div>
    </div>
  )
}

export default FormRow
