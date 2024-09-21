import { SCHEMA_ROLE } from '@/store/slices/base/constants'
import { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
  className?: string
  children?: ReactNode
  style?: CSSProperties
}

export type TableQueries = {
  total?: number
  pageIndex?: number
  pageSize?: number
  query?: string
  sort?: {
    order: 'asc' | 'desc' | ''
    key: string | number
  }
}

export interface TablePaginate {
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export type RolesResponse = {
    status: number
    data: SCHEMA_ROLE[]
}
