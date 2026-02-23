import type { CashFlowProjection, FinanceSnapshot } from '../types'

export const fetchFinanceSnapshots = async (): Promise<FinanceSnapshot[]> =>
  Promise.resolve([
    { id: 'rev', label: 'ARR', value: 12400000, trend: 'up' },
    { id: 'burn', label: 'Burn Rate', value: -320000, trend: 'flat' },
    { id: 'runway', label: 'Runway', value: 18, trend: 'down' },
  ])

export const fetchCashFlowProjection = async (): Promise<CashFlowProjection[]> =>
  Promise.resolve([
    { month: 'Jan', inflow: 1400, outflow: 800 },
    { month: 'Feb', inflow: 1380, outflow: 920 },
    { month: 'Mar', inflow: 1425, outflow: 980 },
    { month: 'Apr', inflow: 1480, outflow: 1020 },
    { month: 'May', inflow: 1520, outflow: 1100 },
  ])
