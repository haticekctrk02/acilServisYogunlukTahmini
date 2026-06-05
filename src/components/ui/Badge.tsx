import { cn } from '../../utils/cn'
import { translateRisk } from '../../i18n/tr'
import type { RiskLevel } from '../../types'
import { getRiskColor } from '../../utils/risk'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'critical' | 'primary'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    critical: 'bg-critical/10 text-critical',
    primary: 'bg-primary/10 text-primary',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  const colors = getRiskColor(level)
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
        colors.bg,
        colors.text,
        colors.border
      )}
    >
      {translateRisk(level)}
    </span>
  )
}
