import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { CashFlowProjection } from '../types'

interface CashFlowChartProps {
  data: CashFlowProjection[]
}

export const CashFlowChart = ({ data }: CashFlowChartProps) => (
  <div className="card" style={{ minHeight: 360 }}>
    <h3>Cash Flow Projection</h3>
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="inflow" stroke="#0ea5e9" strokeWidth={2} />
        <Line type="monotone" dataKey="outflow" stroke="#f97316" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
)
