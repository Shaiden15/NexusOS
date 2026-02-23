import type { FinanceSnapshot } from '../types'

interface SnapshotsGridProps {
  data: FinanceSnapshot[]
}

export const SnapshotsGrid = ({ data }: SnapshotsGridProps) => (
  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
    {data.map((snapshot) => (
      <div key={snapshot.id} className="card">
        <p style={{ color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {snapshot.label}
        </p>
        <h3 style={{ marginTop: '0.5rem', fontSize: '1.5rem' }}>{snapshot.value.toLocaleString()}</h3>
        <small style={{ color: snapshot.trend === 'up' ? '#16a34a' : snapshot.trend === 'down' ? '#dc2626' : '#6b7280' }}>
          Trend: {snapshot.trend}
        </small>
      </div>
    ))}
  </div>
)
