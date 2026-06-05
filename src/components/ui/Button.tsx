import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-light shadow-sm hover:shadow-md active:scale-[0.98]',
    secondary:
      'bg-secondary text-white hover:bg-sky-400 shadow-sm hover:shadow-md active:scale-[0.98]',
    ghost:
      'bg-transparent text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300',
    outline:
      'border border-border bg-transparent text-text hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
