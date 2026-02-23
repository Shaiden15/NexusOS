import { UsersTable } from '../components/UsersTable'
import { useUsers } from '../hooks/useUsers'

export const UsersDirectory = () => {
  const { users, isLoading } = useUsers()

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <header>
        <h2>People Operations</h2>
        <p style={{ color: '#6b7280' }}>
          Govern seats, enforce least privilege, and observe account health.
        </p>
      </header>

      {isLoading ? <div className="card">Loading user registry…</div> : <UsersTable data={users} />}
    </section>
  )
}

export default UsersDirectory
