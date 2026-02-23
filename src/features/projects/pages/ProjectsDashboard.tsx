import { ProjectsTable } from '../components/ProjectsTable'
import { useProjects } from '../hooks/useProjects'

export const ProjectsDashboard = () => {
  const { data, isLoading } = useProjects()

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2>Portfolio Control</h2>
        <p style={{ color: '#6b7280' }}>Live insight into all strategic initiatives.</p>
      </div>
      {isLoading ? (
        <div className="card">Loading projects…</div>
      ) : (
        <ProjectsTable data={data} />
      )}
    </section>
  )
}

export default ProjectsDashboard
