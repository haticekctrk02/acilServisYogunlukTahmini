import { useState } from 'react'
import { useErData } from '../context/ErDataContext'
import { tr } from '../i18n/tr'
import type { PredictionResult } from '../types'
import { PredictionForm } from '../components/prediction/PredictionForm'
import { PredictionResultPanel } from '../components/prediction/PredictionResult'
import { RiskManagementPanel } from '../components/risk/RiskManagementPanel'
import { LoadingState } from '../components/ui/LoadingState'

export function Predictions() {
  const { stats, loading, datasetName } = useErData()
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)

  if (loading) return <LoadingState />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text dark:text-slate-100">Tahminler</h1>
        <p className="mt-1 text-sm text-text-muted dark:text-slate-400">
          {stats?.totalVisits.toLocaleString('tr-TR')} {tr.common.records} · {datasetName}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PredictionForm onPredict={setPrediction} />
        <PredictionResultPanel result={prediction} />
      </div>

      <RiskManagementPanel />
    </div>
  )
}
