export interface FinanceSnapshot {
  id: string
  label: string
  value: number
  trend: 'up' | 'down' | 'flat'
}

export interface CashFlowProjection {
  month: string
  inflow: number
  outflow: number
}
