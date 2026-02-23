import { useEffect, useState } from 'react'
import type { KPI, PerformancePoint } from '../types'
import { fetchKpis, fetchPerformanceSeries } from '../api/analyticsApi'

interface AnalyticsState {
  kpis: KPI[]
  performance: PerformancePoint[]
  isLoading: boolean
}

const initialState: AnalyticsState = {
  kpis: [],
  performance: [],
  isLoading: true,
}

export const useAnalytics = () => {
  const [state, setState] = useState<AnalyticsState>(initialState)

  useEffect(() => {
    let isMounted = true
    Promise.all([fetchKpis(), fetchPerformanceSeries()]).then(([kpis, performance]) => {
      if (!isMounted) return
      setState({ kpis, performance, isLoading: false })
    })
    return () => {
      isMounted = false
    }
  }, [])

  return state
}
