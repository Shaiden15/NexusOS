import { useEffect, useMemo } from 'react'
import type { ColumnDef, ColumnVisibilityState } from './types'

const COLUMN_CONFIG_KEY = 'nexusos-datatable-columns'

interface UseColumnConfigurationOptions<TData> {
  columns: ColumnDef<TData>[]
  tableId?: string
}

interface UseColumnConfigurationResult<TData> {
  visibleColumns: ColumnDef<TData>[]
  columnVisibility: ColumnVisibilityState
  toggleColumnVisibility: (columnId: string) => void
  resetColumnVisibility: () => void
}

export const useColumnConfiguration = <TData,>({
  columns,
  tableId = 'default'
}: UseColumnConfigurationOptions<TData>): UseColumnConfigurationResult<TData> => {
  // Load saved visibility state from localStorage
  const savedVisibility = useMemo(() => {
    if (typeof window === 'undefined') return {}
    
    try {
      const saved = localStorage.getItem(`${COLUMN_CONFIG_KEY}-${tableId}`)
      return saved ? (JSON.parse(saved) as ColumnVisibilityState) : {}
    } catch {
      return {}
    }
  }, [tableId])

  // Merge default visibility with saved visibility
  const columnVisibility = useMemo(() => {
    const defaultVisibility: ColumnVisibilityState = {}
    
    // Set default visibility based on column definitions
    columns.forEach((column) => {
      defaultVisibility[column.id] = !(column.hidden ?? false)
    })
    
    // Override with saved preferences
    return { ...defaultVisibility, ...savedVisibility }
  }, [columns, savedVisibility])

  // Filter columns based on visibility
  const visibleColumns = useMemo(() => {
    return columns.filter((column) => columnVisibility[column.id] !== false)
  }, [columns, columnVisibility])

  // Save visibility state to localStorage when it changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(`${COLUMN_CONFIG_KEY}-${tableId}`, JSON.stringify(columnVisibility))
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [columnVisibility, tableId])

  const toggleColumnVisibility = (columnId: string) => {
    const newVisibility = {
      ...columnVisibility,
      [columnId]: !columnVisibility[columnId]
    }
    
    // Update localStorage immediately for better UX
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${COLUMN_CONFIG_KEY}-${tableId}`, JSON.stringify(newVisibility))
      } catch {
        // Silently fail if localStorage is not available
      }
    }
    
    // Force a re-render by updating the state
    window.dispatchEvent(new CustomEvent('datatable-column-visibility-change', {
      detail: { tableId, columnId, visible: newVisibility[columnId] }
    }))
  }

  const resetColumnVisibility = () => {
    const defaultVisibility: ColumnVisibilityState = {}
    columns.forEach((column) => {
      defaultVisibility[column.id] = !(column.hidden ?? false)
    })
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${COLUMN_CONFIG_KEY}-${tableId}`, JSON.stringify(defaultVisibility))
      } catch {
        // Silently fail if localStorage is not available
      }
    }
    
    window.dispatchEvent(new CustomEvent('datatable-column-visibility-reset', {
      detail: { tableId }
    }))
  }

  return {
    visibleColumns,
    columnVisibility,
    toggleColumnVisibility,
    resetColumnVisibility
  }
}
