import type { KPI } from '../types'

interface KpiGridProps {
  data: KPI[]
}

export const KpiGrid = ({ data }: KpiGridProps) => (
  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
    {data.map((kpi) => (
      <div key={kpi.id} className="card">
        <p style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {kpi.label}
        </p>
        <h3 style={{ marginTop: '0.5rem', fontSize: '1.75rem' }}>{kpi.value}</h3>
        <small style={{ color: kpi.delta >= 0 ? '#16a34a' : '#dc2626' }}>
          {kpi.delta >= 0 ? '+' : '-'}
          {Math.abs(kpi.delta)}% vs last quarter
        </small>
      </div>
    ))}
  </div>
)
