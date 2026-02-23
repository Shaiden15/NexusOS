import { useEffect, useState } from 'react'
import type { Integration, PreferenceGroup } from '../types'
import { fetchIntegrations, fetchPreferences } from '../api/settingsApi'

interface SettingsState {
  preferences: PreferenceGroup[]
  integrations: Integration[]
  isLoading: boolean
  error: string | null
}

const initialState: SettingsState = {
  preferences: [],
  integrations: [],
  isLoading: true,
  error: null,
}

export const useSettings = () => {
  const [state, setState] = useState<SettingsState>(initialState)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        const [preferences, integrations] = await Promise.all([fetchPreferences(), fetchIntegrations()])
        if (!isMounted) return
        setState({ preferences, integrations, isLoading: false, error: null })
      } catch (error) {
        if (!isMounted) return
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown settings error',
        }))
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
