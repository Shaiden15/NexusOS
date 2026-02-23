import { useState } from 'react'
import { DataTable } from '../../../shared/components/data-table/DataTable'
import type { ColumnDef } from '../../../shared/components/data-table/types'
import { useUsers } from '../hooks/useUsers'
import type { UserAccount } from '../types'
import { UserDetailModal } from '../components/UserDetailModal'

export const UsersDirectory = () => {
  const { users, isLoading } = useUsers()
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewUser = (user: UserAccount) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const columns: ColumnDef<UserAccount>[] = [
    { id: "name", header: "Name", accessor: "name", sortable: true },
    { id: "email", header: "Email", accessor: "email", sortable: true },
    { id: "role", header: "Role", accessor: "role", sortable: true },
    {
      id: "actions",
      header: "Actions",
      cell: (user) => (
        <button
          onClick={() => handleViewUser(user)}
          style={{
            padding: '0.25rem 0.75rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.25rem',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          View
        </button>
      ),
    },
  ]

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <header>
        <h2>People Operations</h2>
        <p style={{ color: '#6b7280' }}>
          Govern seats, enforce least privilege, and observe account health.
        </p>
      </header>

      <DataTable
        data={users}
        columns={columns}
        loading={isLoading}
        pageSize={10}
        tableId="users-directory"
        enableColumnConfiguration={true}
      />

      <UserDetailModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

export default UsersDirectory
