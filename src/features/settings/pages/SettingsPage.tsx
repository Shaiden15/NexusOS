import type { CSSProperties } from 'react'
import { PreferencesPanel } from '../components/PreferencesPanel'
import { IntegrationsList } from '../components/IntegrationsList'

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: 16,
}

export default function SettingsPage() {
  return (
    <div style={gridStyle}>
      <h1>Settings</h1>
      <PreferencesPanel />
      <IntegrationsList />
    </div>
  )
}
