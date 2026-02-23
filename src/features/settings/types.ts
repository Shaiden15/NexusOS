export interface PreferenceGroup {
  id: string
  label: string
  description: string
  enabled: boolean
}

export interface Integration {
  id: string
  name: string
  status: 'connected' | 'disconnected'
  lastSync?: string
  enabled: boolean
}
