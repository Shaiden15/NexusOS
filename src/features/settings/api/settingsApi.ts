import type { Integration, PreferenceGroup } from '../types'

export const fetchPreferences = async (): Promise<PreferenceGroup[]> =>
  Promise.resolve([
    {
      id: 'notifications',
      label: 'Executive Alerts',
      description: 'Push escalations to the exec team when KPIs drift.',
      enabled: true,
    },
    {
      id: 'compliance',
      label: 'Compliance Guardrails',
      description: 'Lock data exports behind admin approval.',
      enabled: false,
    },
    {
      id: 'ai-assist',
      label: 'AI Assistance',
      description: 'Allow copilots to summarize enterprise data.',
      enabled: true,
    },
  ])

export const fetchIntegrations = async (): Promise<Integration[]> =>
  Promise.resolve([
    { id: 'okta', name: 'Okta', status: 'connected', lastSync: new Date().toISOString(), enabled: true },
    { id: 'netsuite', name: 'NetSuite', status: 'connected', lastSync: new Date().toISOString(), enabled: true },
    { id: 'sap', name: 'SAP', status: 'disconnected', enabled: false },
  ])
