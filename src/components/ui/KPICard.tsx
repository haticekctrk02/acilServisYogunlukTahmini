import {
  Activity,
  AlertTriangle,
  Bed,
  Clock,
  TrendingDown,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { KPIData } from '../../types'
import { cn } from '../../utils/cn'
import { Sparkline } from './Sparkline'

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  'trending-up': TrendingUp,
  clock: Clock,
  'alert-triangle': AlertTriangle,
  bed: Bed,
  activity: Activity,
}

interface KPICardProps {
  data: KPIData
  index?: number
}

export function KPICard({ data, index = 0 }: KPICardProps) {
  const Icon = iconMap[data.icon] || Activity
  const isPositive = data.trend === 'up'
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <div
      className="animate-slide-up rounded-[14px] border border-border bg-card p-5 card-shadow transition-all duration-300 hover:card-shadow-elevated dark:border-dark-border dark:bg-dark-card"
      style={{ animationDelay: `${index * 80}ms` }}
      role="article"
      aria-label={`${data.label}: ${data.value}${data.unit || ''}`}
    >
      <div className="mb-3 flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${data.color}15` }}
        >
          <Icon className="h-5 w-5" style={{ color: data.color }} aria-hidden="true" />
        </div>
        <div
          className={cn(
            'flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium',
            isPositive
              ? 'bg-success/10 text-success'
              : data.trend === 'down'
                ? 'bg-success/10 text-success'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
          )}
        >
          <TrendIcon className="h-3 w-3" aria-hidden="true" />
          <span>{Math.abs(data.change)}%</span>
        </div>
      </div>

      <p className="mb-1 text-xs font-medium text-text-muted dark:text-slate-400">{data.label}</p>
      <div className="mb-3 flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tight text-text dark:text-slate-100">
          {data.value}
        </span>
        {data.unit && (
          <span className="text-sm text-text-muted dark:text-slate-400">{data.unit}</span>
        )}
      </div>

      <Sparkline data={data.sparkline} color={data.color} />
    </div>
  )
}
