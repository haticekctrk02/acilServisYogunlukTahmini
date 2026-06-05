import {
  CapacityUtilizationChart,
  HourlyTrendChart,
  MonthlyAdmissionsChart,
  PredictionAccuracyChart,
  SeasonalUsageChart,
  WeeklyHeatmapChart,
} from '../components/charts/AnalyticsCharts'
import { ChartContainer } from '../components/charts/ChartContainer'
import { useErData } from '../context/ErDataContext'
import { LoadingState } from '../components/ui/LoadingState'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function ArrivalDistributionChart() {
  const { stats } = useErData()
  if (!stats) return null

  return (
    <ChartContainer title="Hasta Bekleme Dağılımı" description="er_dataset.csv — bekleme süresi dağılımı">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={stats.arrivalDistribution}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
          <XAxis dataKey="range" tick={{ fontSize: 10 }} stroke="#94a3b8" />
          <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="count" name="Hasta" fill="#2563EB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function Analytics() {
  const { stats, loading, error } = useErData()

  if (loading) return <LoadingState />
  if (error || !stats) return <div className="text-critical">{error}</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text dark:text-slate-100">Gelişmiş Analitik</h1>
        <p className="mt-1 text-sm text-text-muted dark:text-slate-400">
          {stats.totalVisits.toLocaleString('tr-TR')} ziyaret kaydı · er_dataset.csv
        </p>
      </div>

      <HourlyTrendChart />
      <WeeklyHeatmapChart />

      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyAdmissionsChart />
        <SeasonalUsageChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ArrivalDistributionChart />
        <PredictionAccuracyChart />
      </div>

      <CapacityUtilizationChart />
    </div>
  )
}
