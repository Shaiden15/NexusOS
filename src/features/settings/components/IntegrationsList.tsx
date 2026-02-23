import { useSettings } from '../hooks/useSettings'

export function IntegrationsList() {
  const { integrations, isLoading, error } = useSettings()

  if (isLoading) return <div>Loading integrations...</div>
  if (error) return <div>Failed to load integrations.</div>

  return (
    <section>
      <h2>Integrations</h2>
      <ul>
        {integrations.map((integration) => (
          <li key={integration.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <strong>{integration.name}</strong>
            <span>—</span>
            <span>{integration.enabled ? 'Enabled' : 'Disabled'}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
