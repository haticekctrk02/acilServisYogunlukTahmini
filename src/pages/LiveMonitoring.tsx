import { HourlyTrendChart } from '../components/charts/AnalyticsCharts'
import { useErData } from '../context/ErDataContext'
import { KPICard } from '../components/ui/KPICard'
import { LoadingState } from '../components/ui/LoadingState'
import { LiveMonitoringWidgets } from '../components/monitoring/LiveMonitoringWidgets'
import { RiskManagementPanel } from '../components/risk/RiskManagementPanel'

export function LiveMonitoring() {
  const { stats, loading, error } = useErData()

  if (loading) return <LoadingState />
  if (error || !stats) return <div className="text-critical">{error}</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text dark:text-slate-100">Canlı İzleme</h1>
        <p className="mt-1 text-sm text-text-muted dark:text-slate-400">
          Gerçek zamanlı acil servis durumu · er_dataset.csv
        </p>
      </div>

      <LiveMonitoringWidgets />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.kpiData.slice(0, 3).map((kpi, i) => (
          <KPICard key={kpi.id} data={kpi} index={i} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <HourlyTrendChart />
        <RiskManagementPanel />
      </div>
    </div>
  )
}
