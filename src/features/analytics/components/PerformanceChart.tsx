import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { PerformancePoint } from '../types'

interface PerformanceChartProps {
  data: PerformancePoint[]
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => (
  <div className="card" style={{ minHeight: 360 }}>
    <h3>Revenue vs Retention</h3>
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `${value}M`} />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          stroke="#0ea5e9"
          fill="#0ea5e9"
          fillOpacity={0.2}
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="retention"
          stroke="#22c55e"
          fill="#22c55e"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)
