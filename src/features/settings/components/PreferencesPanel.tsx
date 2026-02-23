import { useThemeContext } from '@shared/components/ThemeProvider'

export const PreferencesPanel = () => {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>Workspace Preferences</h3>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>Theme</strong>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Toggle between light and dark mode
          </p>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.375rem',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            cursor: 'pointer'
          }}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </div>
  )
}
