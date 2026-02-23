import type { ReactNode } from 'react'
import type { ColumnDef, RowActionRenderer } from './types'
import { useDataTable } from './useDataTable'

export interface DataTableProps<TData extends Record<string, unknown>> {
  data: TData[]
  columns: ColumnDef<TData>[]
  pageSize?: number
  initialSort?: {
    columnId: string
    direction: 'asc' | 'desc'
  }
  toolbar?: ReactNode
  actionsRenderer?: RowActionRenderer<TData>
  emptyState?: ReactNode
  loading?: boolean
  error?: string | null
}

export const DataTable = <TData extends Record<string, unknown>>({
  data,
  columns,
  pageSize,
  initialSort,
  toolbar,
  actionsRenderer,
  emptyState,
  loading,
  error,
}: DataTableProps<TData>) => {
  const {
    rows,
    totalRows,
    filteredRows,
    page,
    pageCount,
    pageSize: resolvedPageSize,
    sort,
    query,
    hasSearchableColumns,
    setPage,
    setQuery,
    requestSort,
  } = useDataTable<TData>({ data, columns, pageSize, initialSort })

  if (loading) {
    return <div className="datatable__empty">Loading data…</div>
  }

  if (error) {
    return <div className="datatable__empty">{error}</div>
  }

  const showEmpty = rows.length === 0

  return (
    <div className="card">
      {(toolbar || hasSearchableColumns) && (
        <div className="datatable__toolbar">
          {toolbar}
          {hasSearchableColumns && (
            <input
              type="search"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          )}
        </div>
      )}

      {showEmpty ? (
        <div className="datatable__empty">{emptyState ?? 'No data available.'}</div>
      ) : (
        <table className="datatable">
          <thead>
            <tr>
              {columns.map((column) => {
                const isSorted = sort?.columnId === column.id
                return (
                  <th
                    key={column.id}
                    style={{ width: column.width, textAlign: column.align ?? 'left' }}
                    className={column.sortable ? 'is-sortable' : undefined}
                    onClick={() => column.sortable && requestSort(column.id)}
                  >
                    <span>{column.header}</span>
                    {column.sortable && isSorted && <span>{sort?.direction === 'asc' ? '▲' : '▼'}</span>}
                  </th>
                )
              })}
              {actionsRenderer && <th style={{ width: 120 }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`datatable-row-${index}`}>
                {columns.map((column) => (
                  <td key={`${column.id}-${index}`} style={{ textAlign: column.align ?? 'left' }}>
                    {column.cell ? column.cell(row) : String(row[column.accessorKey] ?? '')}
                  </td>
                ))}
                {actionsRenderer && <td className="datatable__actions">{actionsRenderer(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="datatable__footer">
        <div>
          Showing {rows.length} of {filteredRows} (Total: {totalRows})
        </div>
        <div className="datatable__pagination">
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>
            Prev
          </button>
          <span>
            Page {page + 1} / {pageCount}
          </span>
          <button onClick={() => setPage(Math.min(page + 1, pageCount - 1))} disabled={page >= pageCount - 1}>
            Next
          </button>
        </div>
        <div>Page size: {resolvedPageSize}</div>
      </div>
    </div>
  )
}
