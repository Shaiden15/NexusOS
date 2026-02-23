import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef, SortDirection, SortState } from './types'

const DEFAULT_PAGE_SIZE = 10

export interface UseDataTableOptions<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  pageSize?: number
  initialSort?: SortState | null
}

export interface UseDataTableResult<TData> {
  rows: TData[]
  totalRows: number
  filteredRows: number
  page: number
  pageSize: number
  pageCount: number
  sort: SortState | null
  query: string
  hasSearchableColumns: boolean
  setPage: (page: number) => void
  setQuery: (value: string) => void
  requestSort: (columnId: string) => void
}

type Accessor<TData> = ColumnDef<TData>['accessorKey']

const getCellValue = <TData,>(row: TData, accessor: Accessor<TData>) =>
  (row as Record<string, unknown>)[accessor]

const toComparable = (value: unknown) => {
  if (value == null) return ''
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'string') return value.toLowerCase()
  if (typeof value === 'number' || typeof value === 'boolean') return value
  return String(value)
}

const compareValues = (a: unknown, b: unknown, direction: SortDirection) => {
  const lhs = toComparable(a)
  const rhs = toComparable(b)
  if (lhs < rhs) return direction === 'asc' ? -1 : 1
  if (lhs > rhs) return direction === 'asc' ? 1 : -1
  return 0
}

export const useDataTable = <TData,>({
  data,
  columns,
  pageSize = DEFAULT_PAGE_SIZE,
  initialSort = null,
}: UseDataTableOptions<TData>): UseDataTableResult<TData> => {
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortState | null>(initialSort)

  const searchableColumns = useMemo(
    () =>
      columns
        .filter((column) => column.searchable !== false)
        .map((column) => column.accessorKey as Accessor<TData>),
    [columns],
  )

  const filteredData = useMemo(() => {
    let rows = data

    if (query.trim() && searchableColumns.length > 0) {
      const normalizedQuery = query.trim().toLowerCase()
      rows = rows.filter((row) =>
        searchableColumns.some((accessor) =>
          String(getCellValue(row, accessor) ?? '').toLowerCase().includes(normalizedQuery),
        ),
      )
    }

    if (sort) {
      const column = columns.find((candidate) => candidate.id === sort.columnId && candidate.sortable)
      if (column) {
        const accessor = column.accessorKey as Accessor<TData>
        rows = [...rows].sort((a, b) =>
          compareValues(getCellValue(a, accessor), getCellValue(b, accessor), sort.direction),
        )
      }
    }

    return rows
  }, [columns, data, query, searchableColumns, sort])

  const filteredRows = filteredData.length
  const resolvedPageSize = pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE
  const pageCount = Math.max(1, Math.ceil(filteredRows / resolvedPageSize))
  const safePage = Math.min(page, pageCount - 1)

  useEffect(() => {
    if (page > safePage) {
      setPage(safePage)
    }
  }, [page, safePage])

  useEffect(() => {
    setPage(0)
  }, [query, data.length, pageSize])

  const rows = useMemo(() => {
    const start = safePage * resolvedPageSize
    return filteredData.slice(start, start + resolvedPageSize)
  }, [filteredData, resolvedPageSize, safePage])

  const requestSort = (columnId: string) => {
    const column = columns.find((candidate) => candidate.id === columnId && candidate.sortable)
    if (!column) return

    setSort((current) => {
      if (!current || current.columnId !== columnId) {
        return { columnId, direction: 'asc' }
      }

      if (current.direction === 'asc') {
        return { columnId, direction: 'desc' }
      }

      return null
    })
  }

  return {
    rows,
    totalRows: data.length,
    filteredRows,
    page: safePage,
    pageCount,
    pageSize: resolvedPageSize,
    sort,
    query,
    hasSearchableColumns: searchableColumns.length > 0,
    setPage,
    setQuery,
    requestSort,
  }
}
