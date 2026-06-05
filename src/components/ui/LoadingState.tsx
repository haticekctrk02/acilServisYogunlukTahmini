import { Loader2 } from 'lucide-react'
import { tr } from '../../i18n/tr'

export function LoadingState({ message = tr.common.loading }: { message?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm text-text-muted">{message}</p>
      <p className="text-xs text-text-muted">er_dataset.csv</p>
    </div>
  )
}
