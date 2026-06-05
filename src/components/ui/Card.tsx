import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  glass?: boolean
  elevated?: boolean
}

export function Card({ children, className, glass, elevated }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[14px] border border-border bg-card p-5 transition-all duration-300',
        'dark:border-dark-border dark:bg-dark-card',
        glass && 'glass',
        elevated ? 'card-shadow-elevated' : 'card-shadow',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4 flex items-center justify-between', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-sm font-semibold text-text dark:text-slate-100', className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-xs text-text-muted dark:text-slate-400', className)}>
      {children}
    </p>
  )
}
