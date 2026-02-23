export interface KPI {
  id: string
  label: string
  value: number
  delta: number
}

export interface PerformancePoint {
  month: string
  revenue: number
  retention: number
}
