import {
  Ambulance,
  Bed,
  BedDouble,
  HeartPulse,
  Hourglass,
  Stethoscope,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useErData } from '../../context/ErDataContext'
import { cn } from '../../utils/cn'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/Card'

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  bed: Bed,
  'bed-double': BedDouble,
  stethoscope: Stethoscope,
  'heart-pulse': HeartPulse,
  ambulance: Ambulance,
  hourglass: Hourglass,
}

const statusColors = {
  normal: 'border-success/30 bg-success/5',
  warning: 'border-warning/30 bg-warning/5',
  critical: 'border-critical/30 bg-critical/5',
}

export function LiveMonitoringWidgets() {
  const { stats } = useErData()
  if (!stats) return null

  return (
    <Card elevated>
      <CardHeader>
        <div>
          <CardTitle>Canlı İzleme</CardTitle>
          <CardDescription>
            er_dataset.csv — son {stats.liveMetrics[0]?.value} ziyaret analizi
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-success" aria-hidden="true" />
          <span className="text-xs font-medium text-success">Canlı</span>
        </div>
      </CardHeader>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {stats.liveMetrics.map((metric) => {
          const Icon = iconMap[metric.icon] || Users
          return (
            <div
              key={metric.label}
              className={cn(
                'rounded-xl border p-4 transition-all duration-300',
                statusColors[metric.status || 'normal']
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <Icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
                {metric.status === 'critical' && (
                  <span className="h-2 w-2 rounded-full bg-critical animate-pulse-soft" aria-hidden="true" />
                )}
              </div>
              <p className="text-2xl font-bold text-text dark:text-slate-100">{metric.value}</p>
              <p className="text-xs text-text-muted">{metric.label}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
