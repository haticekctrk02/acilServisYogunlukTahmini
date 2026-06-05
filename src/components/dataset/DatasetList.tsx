import { FileSpreadsheet, Trash2 } from 'lucide-react'
import { useDatasets } from '../../context/DatasetContext'
import { Button } from '../ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { cn } from '../../utils/cn'

export function DatasetList() {
  const { datasets, removeDataset, activeDatasetId, setActiveDatasetId } = useDatasets()

  if (datasets.length === 0) return null

  return (
    <Card elevated>
      <CardHeader>
        <div>
          <CardTitle>Yüklenen Datasetler</CardTitle>
          <CardDescription>{datasets.length} CSV dosyası yüklendi</CardDescription>
        </div>
      </CardHeader>

      <div className="space-y-2">
        {datasets.map((ds) => (
          <div
            key={ds.id}
            className={cn(
              'flex items-center justify-between rounded-xl border p-3 transition-colors',
              activeDatasetId === ds.id
                ? 'border-primary/40 bg-primary/5'
                : 'border-border hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800/50'
            )}
          >
            <button
              onClick={() => setActiveDatasetId(activeDatasetId === ds.id ? null : ds.id)}
              className="flex flex-1 items-center gap-3 text-left"
            >
              <FileSpreadsheet className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-text dark:text-slate-200">{ds.name}</p>
                <p className="text-xs text-text-muted">
                  {ds.fileName} · {ds.rowCount} kayıt ·{' '}
                  {new Date(ds.uploadedAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeDataset(ds.id)}
              aria-label={`${ds.name} datasetini sil`}
            >
              <Trash2 className="h-4 w-4 text-critical" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
