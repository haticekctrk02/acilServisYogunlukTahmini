import { useState } from 'react'
import { HourlyTrendChart } from '../components/charts/AnalyticsCharts'
import { useErData } from '../context/ErDataContext'
import { tr } from '../i18n/tr'
import type { PredictionResult } from '../types'
import { KPICard } from '../components/ui/KPICard'
import { LoadingState } from '../components/ui/LoadingState'
import { LiveMonitoringWidgets } from '../components/monitoring/LiveMonitoringWidgets'
import { PredictionForm } from '../components/prediction/PredictionForm'
import { PredictionResultPanel } from '../components/prediction/PredictionResult'
import { RiskManagementPanel } from '../components/risk/RiskManagementPanel'

export function Dashboard() {
  const { stats, loading, error, datasetName } = useErData()
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)

  if (loading) return <LoadingState />
  if (error || !stats) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-critical">
        {error || tr.common.loadError}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text dark:text-slate-100">
          Kontrol Paneli
        </h1>
        <p className="mt-1 text-sm text-text-muted dark:text-slate-400">
          {tr.appTagline} · {stats.totalVisits.toLocaleString('tr-TR')} {tr.common.records} · {datasetName}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.kpiData.map((kpi, i) => (
          <KPICard key={kpi.id} data={kpi} index={i} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PredictionForm onPredict={setPrediction} />
        <PredictionResultPanel result={prediction} />
      </div>

      <LiveMonitoringWidgets />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HourlyTrendChart />
        </div>
        <RiskManagementPanel />
      </div>
    </div>
  )
}
