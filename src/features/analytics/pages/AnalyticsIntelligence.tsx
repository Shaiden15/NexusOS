import { KpiGrid } from '../components/KpiGrid'
import { PerformanceChart } from '../components/PerformanceChart'
import { useAnalytics } from '../hooks/useAnalytics'

export const AnalyticsIntelligence = () => {
  const { kpis, performance, isLoading } = useAnalytics()

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <header>
        <h2>Intelligence Ops</h2>
        <p style={{ color: '#6b7280' }}>
          Monitor revenue velocity, retention, and sentiment with a single glance.
        </p>
      </header>

      {isLoading ? (
        <div className="card">Loading analytic signals…</div>
      ) : (
        <>
          <KpiGrid data={kpis} />
          <PerformanceChart data={performance} />
        </>
      )}
    </section>
  )
}

export default AnalyticsIntelligence
