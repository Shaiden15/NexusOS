import { DataTable } from '@shared/components/data-table'
import type { ColumnDef } from '@shared/components/data-table'
import { formatCurrency, formatDate } from '@shared/utils/format'
import type { Project } from '../types'

interface ProjectsTableProps {
  data: Project[]
}

const columns: ColumnDef<Project>[] = [
  { id: 'name', header: 'Project', accessorKey: 'name', sortable: true },
  { id: 'owner', header: 'Owner', accessorKey: 'owner', sortable: true },
  { id: 'status', header: 'Status', accessorKey: 'status' },
  {
    id: 'budget',
    header: 'Budget',
    accessorKey: 'budget',
    sortable: true,
    cell: (project) => formatCurrency(project.budget),
  },
  {
    id: 'updatedAt',
    header: 'Updated',
    accessorKey: 'updatedAt',
    sortable: true,
    cell: (project) => formatDate(project.updatedAt),
  },
]

export const ProjectsTable = ({ data }: ProjectsTableProps) => (
  <DataTable
    data={data}
    columns={columns}
    pageSize={5}
    initialSort={{ columnId: 'updatedAt', direction: 'desc' }}
    emptyState="No projects available."
  />
)
