import { useThemeContext } from '@shared/components/ThemeProvider'
import { useAuth } from '@shared/hooks/useAuth'

export const AppHeader = () => {
  const { toggleTheme, theme } = useThemeContext()
  const { user } = useAuth()

  return (
    <header className="app-header">
      <div>
        <h1>NexusOS</h1>
        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Unified operating system for modern SaaS</p>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={toggleTheme} className="card" style={{ padding: '0.5rem 1rem' }}>
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
        <div>
          <p style={{ fontWeight: 600 }}>{user?.name ?? 'Guest'}</p>
          <small>{user?.role ?? 'Unauthenticated'}</small>
        </div>
      </div>
    </header>
  )
}
