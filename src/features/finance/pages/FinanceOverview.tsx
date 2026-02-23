import { SnapshotsGrid } from '../components/SnapshotsGrid'
import { CashFlowChart } from '../components/CashFlowChart'
import { useFinance } from '../hooks/useFinance'

export const FinanceOverview = () => {
  const { snapshots, cashFlow, isLoading } = useFinance()

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <header>
        <h2>Financial Command Center</h2>
        <p style={{ color: '#6b7280' }}>
          Track real-time health, burn, and runway to ensure strategic discipline.
        </p>
      </header>

      {isLoading ? (
        <div className="card">Loading financial telemetry…</div>
      ) : (
        <>
          <SnapshotsGrid data={snapshots} />
          <CashFlowChart data={cashFlow} />
        </>
      )}
    </section>
  )
}

export default FinanceOverview
