import { Brain, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useErData } from '../../context/ErDataContext'
import { tr } from '../../i18n/tr'
import type { PredictionInput, PredictionResult, RiskLevel } from '../../types'
import { urgencyToRisk } from '../../utils/erDatasetParser'
import { Button } from '../ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/Card'

interface PredictionFormProps {
  onPredict: (result: PredictionResult) => void
}

const TIME_OF_DAY_HOURS: Record<string, number> = {
  Morning: 9,
  'Late Morning': 11,
  Afternoon: 14,
  Evening: 18,
  Night: 22,
}

export function PredictionForm({ onPredict }: PredictionFormProps) {
  const { stats } = useErData()
  const [loading, setLoading] = useState(false)

  const options = useMemo(() => {
    if (!stats) return null
    const days = [...new Set(stats.visits.map((v) => v.dayOfWeek))]
    const seasons = [...new Set(stats.visits.map((v) => v.season))]
    const timesOfDay = [...new Set(stats.visits.map((v) => v.timeOfDay))]
    const urgencies = ['Low', 'Medium', 'High', 'Critical'] as const
    return { days, seasons, timesOfDay, urgencies }
  }, [stats])

  const [form, setForm] = useState<PredictionInput & { urgencyLevel: string; season: string; timeOfDay: string }>({
    dayOfWeek: 'Monday',
    hour: 14,
    temperature: 22,
    weatherCondition: 'Clear',
    isHoliday: false,
    isSpecialEvent: false,
    previousHourCount: 95,
    urgencyLevel: 'Medium',
    season: 'Winter',
    timeOfDay: 'Afternoon',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stats) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))

    const matching = stats.visits.filter(
      (v) =>
        v.dayOfWeek === form.dayOfWeek &&
        v.season === form.season &&
        v.timeOfDay === form.timeOfDay &&
        v.urgencyLevel === form.urgencyLevel
    )

    const avgWait = matching.length
      ? Math.round(matching.reduce((s, v) => s + v.totalWaitTime, 0) / matching.length)
      : stats.avgWaitTime

    const predicted = matching.length || Math.round(stats.totalVisits / 500)
    const densityLevel: RiskLevel = urgencyToRisk(form.urgencyLevel as 'Low' | 'Medium' | 'High' | 'Critical')

    onPredict({
      predictedCount: predicted,
      densityLevel,
      confidence: matching.length > 50 ? 92 : matching.length > 10 ? 85 : 78,
      explanation: `er_dataset.csv verisine göre ${tr.days[form.dayOfWeek] || form.dayOfWeek} günü, ${tr.seasons[form.season] || form.season} mevsiminde, ${tr.timeOfDay[form.timeOfDay] || form.timeOfDay} saatlerinde ${tr.urgency[form.urgencyLevel] || form.urgencyLevel} aciliyet seviyesinde ortalama ${avgWait} dk bekleme süresi ve ${matching.length} benzer kayıt tespit edildi.`,
      expectedWaitingTime: avgWait,
      recommendedStaffing:
        densityLevel === 'CRITICAL' ? tr.staffing.maximum :
        densityLevel === 'HIGH' ? tr.staffing.enhanced :
        densityLevel === 'MEDIUM' ? tr.staffing.standardPlus : tr.staffing.standard,
    })
    setLoading(false)
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark-border dark:bg-dark-bg dark:text-slate-100'

  if (!options) return null

  return (
    <Card elevated className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Brain className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <CardTitle>YZ Tahmin Merkezi</CardTitle>
            <CardDescription>er_dataset.csv verilerine dayalı tahmin</CardDescription>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dayOfWeek" className="mb-1.5 block text-xs font-medium text-text-muted">Haftanın Günü</label>
          <select id="dayOfWeek" value={form.dayOfWeek} onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })} className={inputClass}>
            {options.days.map((d) => <option key={d} value={d}>{tr.days[d] || d}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="season" className="mb-1.5 block text-xs font-medium text-text-muted">Mevsim</label>
          <select id="season" value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })} className={inputClass}>
            {options.seasons.map((s) => <option key={s} value={s}>{tr.seasons[s] || s}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="timeOfDay" className="mb-1.5 block text-xs font-medium text-text-muted">Günün Zamanı</label>
          <select
            id="timeOfDay"
            value={form.timeOfDay}
            onChange={(e) => {
              const timeOfDay = e.target.value
              setForm({ ...form, timeOfDay, hour: TIME_OF_DAY_HOURS[timeOfDay] || 12 })
            }}
            className={inputClass}
          >
            {options.timesOfDay.map((t) => <option key={t} value={t}>{tr.timeOfDay[t] || t}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="urgency" className="mb-1.5 block text-xs font-medium text-text-muted">Aciliyet Seviyesi</label>
          <select id="urgency" value={form.urgencyLevel} onChange={(e) => setForm({ ...form, urgencyLevel: e.target.value })} className={inputClass}>
            {options.urgencies.map((u) => <option key={u} value={u}>{tr.urgency[u]}</option>)}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                er_dataset.csv analiz ediliyor...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" aria-hidden="true" />
                AS Yoğunluğunu Tahmin Et
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
