import type { KPI, PerformancePoint } from '../types'

export const fetchKpis = async (): Promise<KPI[]> =>
  Promise.resolve([
    { id: 'conversion', label: 'Conversion', value: 42, delta: 6 },
    { id: 'retention', label: 'Net Retention', value: 128, delta: 3 },
    { id: 'nps', label: 'NPS', value: 68, delta: -2 },
  ])

export const fetchPerformanceSeries = async (): Promise<PerformancePoint[]> =>
  Promise.resolve([
    { month: 'Jan', revenue: 1.2, retention: 94 },
    { month: 'Feb', revenue: 1.35, retention: 95 },
    { month: 'Mar', revenue: 1.5, retention: 96 },
    { month: 'Apr', revenue: 1.65, retention: 94 },
    { month: 'May', revenue: 1.8, retention: 97 },
  ])
