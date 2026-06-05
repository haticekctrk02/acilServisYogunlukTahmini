import { AlertCircle, CheckCircle, ShieldAlert, Siren } from 'lucide-react'
import { tr } from '../../i18n/tr'
import { cn } from '../../utils/cn'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/Card'

const riskLevels = [
  {
    classification: tr.riskClassification.normal,
    range: '%0-25',
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/30',
    icon: CheckCircle,
    active: false,
  },
  {
    classification: tr.riskClassification.monitoring,
    range: '%26-50',
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    icon: AlertCircle,
    active: false,
  },
  {
    classification: tr.riskClassification.staff,
    range: '%51-75',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    icon: ShieldAlert,
    active: true,
  },
  {
    classification: tr.riskClassification.critical,
    range: '%76-100',
    color: 'text-critical',
    bg: 'bg-critical/10',
    border: 'border-critical/30',
    icon: Siren,
    active: false,
  },
]

export function RiskManagementPanel() {
  const currentScore = 68
  const currentClassification = tr.riskClassification.staff

  return (
    <Card elevated>
      <CardHeader>
        <div>
          <CardTitle>Risk Yönetimi</CardTitle>
          <CardDescription>Mevcut operasyonel risk değerlendirmesi ve öneriler</CardDescription>
        </div>
      </CardHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 text-center">
          <p className="text-xs font-medium text-text-muted">Risk Skoru</p>
          <p className="text-3xl font-bold text-orange-500">{currentScore}</p>
        </div>
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 text-center">
          <p className="text-xs font-medium text-text-muted">Risk Yüzdesi</p>
          <p className="text-3xl font-bold text-orange-500">{currentScore}%</p>
        </div>
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 text-center sm:col-span-1">
          <p className="text-xs font-medium text-text-muted">Sınıflandırma</p>
          <p className="text-sm font-bold text-orange-500">{currentClassification}</p>
        </div>
      </div>

      <div className="space-y-2">
        {riskLevels.map((level) => {
          const Icon = level.icon
          return (
            <div
              key={level.classification}
              className={cn(
                'flex items-center gap-4 rounded-xl border p-4 transition-all',
                level.active ? `${level.bg} ${level.border} ring-2 ring-orange-500/20` : 'border-border dark:border-dark-border opacity-60'
              )}
            >
              <Icon className={cn('h-5 w-5 shrink-0', level.color)} aria-hidden="true" />
              <div className="flex-1">
                <p className={cn('text-sm font-semibold', level.active ? level.color : 'text-text dark:text-slate-300')}>
                  {level.classification}
                </p>
                <p className="text-xs text-text-muted">Risk aralığı: {level.range}</p>
              </div>
              {level.active && (
                <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-xs font-semibold text-orange-500">
                  {tr.common.active}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 rounded-xl border border-warning/30 bg-warning/5 p-4">
        <p className="text-sm font-semibold text-warning">Öneri</p>
        <p className="mt-1 text-sm text-text-muted dark:text-slate-400">
          Acil servise 2 ek hemşire ve 1 doktor görevlendirin. Gözlem yatakları için taşma protokolünü aktive edin.
        </p>
      </div>
    </Card>
  )
}
