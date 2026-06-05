import { translateRisk } from '../../i18n/tr'
import { cn } from '../../utils/cn'
import type { RiskLevel } from '../../types'
import { getRiskColor } from '../../utils/risk'

interface RiskGaugeProps {
  score: number
  level: RiskLevel
  className?: string
}

export function RiskGauge({ score, level, className }: RiskGaugeProps) {
  const colors = getRiskColor(level)
  const rotation = (score / 100) * 180 - 90

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative h-28 w-56 overflow-hidden">
        <svg viewBox="0 0 200 110" className="h-full w-full" aria-hidden="true">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className="text-slate-200 dark:text-slate-700"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={colors.hex}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 251} 251`}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-2 text-center">
          <span className="text-3xl font-bold text-text dark:text-slate-100">{score}%</span>
        </div>
        <div
          className="absolute bottom-0 left-1/2 h-16 w-1 origin-bottom rounded-full bg-slate-800 transition-transform duration-700 dark:bg-slate-200"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        />
      </div>
      <span className={cn('mt-2 text-sm font-semibold', colors.text)}>
        {translateRisk(level)} RİSK
      </span>
    </div>
  )
}
