import type { ReactNode } from 'react'

export type SortDirection = 'asc' | 'desc'

export type AccessorKey<TData> = Extract<keyof TData, string>

export interface ColumnDef<TData> {
  id: string
  header: string
  accessor?: keyof TData
  sortable?: boolean
  searchable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  cell?: (row: TData) => ReactNode
  hidden?: boolean
}

export interface SortState {
  columnId: string
  direction: SortDirection
}

export type RowActionRenderer<TData> = (row: TData) => ReactNode

export interface ColumnVisibilityState {
  [columnId: string]: boolean
}
