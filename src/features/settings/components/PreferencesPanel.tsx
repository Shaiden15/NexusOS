import { useSettings } from '../hooks/useSettings'

export const PreferencesPanel = () => {
  const { preferences, isLoading, error } = useSettings()

  if (isLoading) {
    return <div className="card">Loading preferences…</div>
  }

  if (error) {
    return <div className="card">Failed to load preferences.</div>
  }

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>Workspace Preferences</h3>
      {preferences.map((preference) => (
        <div key={preference.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <strong>{preference.label}</strong>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{preference.description}</p>
          </div>
          <span>{preference.enabled ? 'Enabled' : 'Disabled'}</span>
        </div>
      ))}
    </div>
  )
}
