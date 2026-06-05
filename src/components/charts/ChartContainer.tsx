import type { ReactNode } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/Card'

interface ChartContainerProps {
  title: string
  description?: string
  children: ReactNode
  action?: ReactNode
  className?: string
}

export function ChartContainer({ title, description, children, action, className }: ChartContainerProps) {
  return (
    <Card className={className} elevated>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action}
      </CardHeader>
      {children}
    </Card>
  )
}
