import type { RiskLevel } from '../types'

export function getRiskColor(level: RiskLevel) {
  const colors = {
    LOW: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/30', hex: '#22C55E' },
    MEDIUM: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/30', hex: '#F59E0B' },
    HIGH: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30', hex: '#F97316' },
    CRITICAL: { bg: 'bg-critical/10', text: 'text-critical', border: 'border-critical/30', hex: '#EF4444' },
  }
  return colors[level]
}

export function getRiskScore(level: RiskLevel): number {
  const scores = { LOW: 25, MEDIUM: 50, HIGH: 75, CRITICAL: 95 }
  return scores[level]
}
