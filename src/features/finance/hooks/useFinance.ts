import { useEffect, useState } from 'react'
import type { CashFlowProjection, FinanceSnapshot } from '../types'
import { fetchCashFlowProjection, fetchFinanceSnapshots } from '../api/financeApi'

interface FinanceState {
  snapshots: FinanceSnapshot[]
  cashFlow: CashFlowProjection[]
  isLoading: boolean
}

const initialState: FinanceState = {
  snapshots: [],
  cashFlow: [],
  isLoading: true,
}

export const useFinance = () => {
  const [state, setState] = useState<FinanceState>(initialState)

  useEffect(() => {
    let isMounted = true
    Promise.all([fetchFinanceSnapshots(), fetchCashFlowProjection()]).then(([snapshots, cashFlow]) => {
      if (!isMounted) return
      setState({ snapshots, cashFlow, isLoading: false })
    })
    return () => {
      isMounted = false
    }
  }, [])

  return state
}
