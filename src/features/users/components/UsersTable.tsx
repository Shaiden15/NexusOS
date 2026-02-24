import { DataTable } from '@shared/components/data-table'
import type { ColumnDef } from '@shared/components/data-table'
import type { User } from '../types'

interface UsersTableProps {
  data: User[]
}

const columns: ColumnDef<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'email', header: 'Email', accessorKey: 'email', sortable: true },
  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
  { id: 'status', header: 'Status', accessorKey: 'status', sortable: true },
]

export const UsersTable = ({ data }: UsersTableProps) => (
  <DataTable
    data={data}
    columns={columns}
    pageSize={5}
    initialSort={{ columnId: 'name', direction: 'asc' }}
    emptyState="No users available."
  />
)
