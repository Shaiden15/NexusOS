import type { ColumnDef } from './types'

interface ColumnConfigurationProps<TData> {
  columns: ColumnDef<TData>[]
  columnVisibility: { [columnId: string]: boolean }
  onToggleColumn: (columnId: string) => void
  onResetColumns: () => void
}

export function ColumnConfiguration<TData>({
  columns,
  columnVisibility,
  onToggleColumn,
  onResetColumns
}: ColumnConfigurationProps<TData>) {
  return (
    <div style={{ 
      padding: '0.5rem 0', 
      borderBottom: '1px solid var(--color-border)',
      marginBottom: '0.5rem'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '0.5rem'
      }}>
        <strong style={{ fontSize: '0.875rem' }}>Columns</strong>
        <button
          onClick={onResetColumns}
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.25rem',
            background: 'transparent',
            color: 'var(--color-text)',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.5rem' 
      }}>
        {columns.map((column) => (
          <label
            key={column.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            <input
              type="checkbox"
              checked={columnVisibility[column.id] !== false}
              onChange={() => onToggleColumn(column.id)}
              style={{ margin: 0 }}
            />
            {column.header}
          </label>
        ))}
      </div>
    </div>
  )
}
