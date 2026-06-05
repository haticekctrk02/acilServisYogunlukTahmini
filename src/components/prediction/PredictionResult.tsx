import { Clock, Shield, Sparkles, Users } from 'lucide-react'
import { translateRisk } from '../../i18n/tr'
import type { PredictionResult as PredictionResultType } from '../../types'
import { getRiskColor, getRiskScore } from '../../utils/risk'
import { cn } from '../../utils/cn'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { RiskBadge } from '../ui/Badge'
import { RiskGauge } from '../ui/RiskGauge'
import { EmptyState } from '../ui/EmptyState'

interface PredictionResultProps {
  result: PredictionResultType | null
}

export function PredictionResultPanel({ result }: PredictionResultProps) {
  if (!result) {
    return (
      <Card elevated className="h-full">
        <EmptyState
          icon={Sparkles}
          title="Henüz tahmin oluşturulmadı"
          description="YZ Tahmin Merkezi'nde parametreleri ayarlayın ve 'AS Yoğunluğunu Tahmin Et' butonuna tıklayın."
        />
      </Card>
    )
  }

  const colors = getRiskColor(result.densityLevel)
  const riskScore = getRiskScore(result.densityLevel)

  return (
    <Card elevated className="h-full animate-slide-up">
      <CardHeader>
        <div>
          <CardTitle>Tahmin Sonuçları</CardTitle>
          <CardDescription>YZ tarafından üretilen AS yoğunluk tahmini</CardDescription>
        </div>
        <RiskBadge level={result.densityLevel} />
      </CardHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <RiskGauge score={riskScore} level={result.densityLevel} />
          <div className="mt-4 text-center">
            <p className="text-sm text-text-muted">Tahmini Hasta Sayısı</p>
            <p className="text-4xl font-bold text-text dark:text-slate-100">{result.predictedCount}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className={cn('rounded-xl border p-4', colors.bg, colors.border)}>
            <div className="mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" style={{ color: colors.hex }} aria-hidden="true" />
              <span className="text-sm font-semibold text-text dark:text-slate-200">Yoğunluk Seviyesi</span>
            </div>
            <p className={cn('text-2xl font-bold', colors.text)}>{translateRisk(result.densityLevel)}</p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4 dark:border-dark-border dark:bg-dark-bg">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-text-muted">Güven Skoru</span>
              <span className="text-sm font-bold text-primary">{result.confidence}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border p-3 dark:border-dark-border">
              <div className="flex items-center gap-2 text-text-muted">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs">Beklenen Süre</span>
              </div>
              <p className="mt-1 text-lg font-bold text-text dark:text-slate-100">{result.expectedWaitingTime} dk</p>
            </div>
            <div className="rounded-xl border border-border p-3 dark:border-dark-border">
              <div className="flex items-center gap-2 text-text-muted">
                <Shield className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs">Personel Seviyesi</span>
              </div>
              <p className="mt-1 text-lg font-bold text-text dark:text-slate-100">{result.recommendedStaffing}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-primary/5 p-4 dark:border-dark-border">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">YZ Açıklaması</p>
        <p className="text-sm leading-relaxed text-text dark:text-slate-300">{result.explanation}</p>
      </div>
    </Card>
  )
}
