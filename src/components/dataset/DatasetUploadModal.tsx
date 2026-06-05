import { AlertCircle, CheckCircle2, FileSpreadsheet, Upload, X } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useDatasets } from '../../context/DatasetContext'
import { parseHistoricalCsv } from '../../utils/csvParser'
import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'

interface DatasetUploadModalProps {
  open: boolean
  onClose: () => void
}

export function DatasetUploadModal({ open, onClose }: DatasetUploadModalProps) {
  const { addDataset } = useDatasets()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [datasetName, setDatasetName] = useState('')
  const [previewCount, setPreviewCount] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [parsedContent, setParsedContent] = useState('')

  const reset = () => {
    setFileName('')
    setDatasetName('')
    setPreviewCount(null)
    setError('')
    setSuccess(false)
    setParsedContent('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const processFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError('Lütfen yalnızca .csv dosyası yükleyin.')
      return
    }

    setFileName(file.name)
    setDatasetName(file.name.replace(/\.csv$/i, ''))
    setError('')
    setSuccess(false)

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setParsedContent(content)
      const { records, errors } = parseHistoricalCsv(content)
      if (errors.length > 0 && records.length === 0) {
        setError(errors[0])
        setPreviewCount(null)
      } else {
        setPreviewCount(records.length)
        if (errors.length > 0) setError(errors[0])
      }
    }
    reader.onerror = () => setError('Dosya okunamadı. Lütfen tekrar deneyin.')
    reader.readAsText(file, 'UTF-8')
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleUpload = () => {
    if (!parsedContent) {
      setError('Önce bir CSV dosyası seçin.')
      return
    }

    const { records, errors } = parseHistoricalCsv(parsedContent)
    if (records.length === 0) {
      setError(errors[0] || 'Geçerli kayıt bulunamadı.')
      return
    }

    addDataset(datasetName || fileName, fileName, records)
    setSuccess(true)
    setError('')
    setTimeout(handleClose, 1500)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="upload-title">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg animate-slide-up rounded-[14px] border border-border bg-card p-6 card-shadow-elevated dark:border-dark-border dark:bg-dark-card">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Upload className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 id="upload-title" className="text-lg font-semibold text-text dark:text-slate-100">
                Dataset Yükle
              </h2>
              <p className="text-xs text-text-muted">CSV dosyanızı sisteme ekleyin</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'mb-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors',
            dragOver
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800/50'
          )}
        >
          <FileSpreadsheet className="mb-3 h-10 w-10 text-primary" aria-hidden="true" />
          <p className="text-sm font-medium text-text dark:text-slate-200">
            CSV dosyasını sürükleyip bırakın
          </p>
          <p className="mt-1 text-xs text-text-muted">veya dosya seçmek için tıklayın</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            aria-label="CSV dosyası seç"
          />
        </div>

        {fileName && (
          <div className="mb-4">
            <label htmlFor="dataset-name" className="mb-1.5 block text-xs font-medium text-text-muted">
              Dataset Adı
            </label>
            <input
              id="dataset-name"
              type="text"
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark-border dark:bg-dark-bg dark:text-slate-100"
            />
            <p className="mt-1 text-xs text-text-muted">Dosya: {fileName}</p>
          </div>
        )}

        {previewCount !== null && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-success/30 bg-success/5 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
            <span className="text-sm text-success">{previewCount} kayıt algılandı</span>
          </div>
        )}

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-critical/30 bg-critical/5 px-3 py-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-critical" aria-hidden="true" />
            <span className="text-sm text-critical">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-success/30 bg-success/5 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
            <span className="text-sm font-medium text-success">Dataset başarıyla yüklendi!</span>
          </div>
        )}

        <div className="mb-4 rounded-xl border border-border bg-background p-3 dark:border-dark-border dark:bg-dark-bg">
          <p className="mb-2 text-xs font-semibold text-text-muted">Desteklenen CSV sütunları:</p>
          <p className="text-xs leading-relaxed text-text-muted">
            date/tarih, time/saat, predicted/tahmin, actual/gercek, accuracy/dogruluk,
            risk_level/risk_seviyesi, waiting_time/bekleme_suresi
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleClose}>
            İptal
          </Button>
          <Button className="flex-1" onClick={handleUpload} disabled={!previewCount || success}>
            <Upload className="h-4 w-4" aria-hidden="true" />
            Yükle
          </Button>
        </div>
      </div>
    </div>
  )
}
