import { ArrowDown, ArrowUp, ArrowUpDown, Database, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DatasetList } from '../components/dataset/DatasetList'
import { DatasetUploadButton } from '../components/dataset/DatasetUploadButton'
import { useDatasets } from '../context/DatasetContext'
import { useErData } from '../context/ErDataContext'
import type { HistoricalRecord, RiskLevel } from '../types'
import { RiskBadge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingState } from '../components/ui/LoadingState'
import { cn } from '../utils/cn'

type SortKey = keyof HistoricalRecord
type SortDir = 'asc' | 'desc'

const PAGE_SIZE = 15

export function HistoricalData() {
  const { stats, loading, error, datasetName } = useErData()
  const { allRecords, datasets, activeDatasetId } = useDatasets()
  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'ALL'>('ALL')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(1)
  const [dataSource, setDataSource] = useState<'dataset' | 'uploaded'>('dataset')

  const sourceRecords = useMemo(() => {
    if (dataSource === 'uploaded') {
      if (activeDatasetId) {
        const ds = datasets.find((d) => d.id === activeDatasetId)
        return ds?.records ?? allRecords
      }
      return allRecords
    }
    return stats?.historicalRecords ?? []
  }, [dataSource, stats, allRecords, activeDatasetId, datasets])

  const filtered = useMemo(() => {
    let data = [...sourceRecords]

    if (search) {
      const q = search.toLowerCase()
      data = data.filter(
        (r) =>
          r.date.toLowerCase().includes(q) ||
          r.time.includes(q) ||
          r.riskLevel.toLowerCase().includes(q)
      )
    }

    if (riskFilter !== 'ALL') {
      data = data.filter((r) => r.riskLevel === riskFilter)
    }

    data.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      }
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })

    return data
  }, [sourceRecords, search, riskFilter, sortKey, sortDir])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDown className="h-3 w-3 opacity-40" />
    return sortDir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: 'date', label: 'Tarih' },
    { key: 'time', label: 'Saat' },
    { key: 'predictedCount', label: 'Tahmin (dk)' },
    { key: 'actualCount', label: 'Gerçek (dk)' },
    { key: 'accuracy', label: 'Doğruluk' },
    { key: 'riskLevel', label: 'Risk' },
    { key: 'waitingTime', label: 'Bekleme' },
  ]

  if (loading) return <LoadingState />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text dark:text-slate-100">Geçmiş Veriler</h1>
          <p className="mt-1 text-sm text-text-muted dark:text-slate-400">
            {stats?.totalVisits.toLocaleString()} kayıt · {datasetName}
          </p>
        </div>
        <DatasetUploadButton />
      </div>

      <DatasetList />

      <Card elevated>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Kayıt ara..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark-border dark:bg-dark-bg dark:text-slate-100"
              aria-label="Geçmiş kayıtları ara"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="data-source" className="text-xs font-medium text-text-muted">Kaynak:</label>
            <select
              id="data-source"
              value={dataSource}
              onChange={(e) => { setDataSource(e.target.value as typeof dataSource); setPage(1) }}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm dark:border-dark-border dark:bg-dark-bg dark:text-slate-100"
            >
              <option value="dataset">er_dataset.csv</option>
              <option value="uploaded">Yüklenen CSV</option>
            </select>

            <label htmlFor="risk-filter" className="text-xs font-medium text-text-muted">Risk:</label>
            <select
              id="risk-filter"
              value={riskFilter}
              onChange={(e) => { setRiskFilter(e.target.value as RiskLevel | 'ALL'); setPage(1) }}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm dark:border-dark-border dark:bg-dark-bg dark:text-slate-100"
            >
              <option value="ALL">Tümü</option>
              <option value="LOW">Düşük</option>
              <option value="MEDIUM">Orta</option>
              <option value="HIGH">Yüksek</option>
              <option value="CRITICAL">Kritik</option>
            </select>
          </div>
        </div>

        {error && dataSource === 'dataset' && (
          <p className="mb-4 text-sm text-critical">{error}</p>
        )}

        {paginated.length === 0 ? (
          <EmptyState
            icon={Database}
            title="Kayıt bulunamadı"
            description="Arama veya filtre kriterlerinizi değiştirmeyi deneyin."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-border dark:border-dark-border">
                    {columns.map((col) => (
                      <th key={col.key} className="px-4 py-3 text-left" scope="col">
                        <button
                          onClick={() => toggleSort(col.key)}
                          className="flex items-center gap-1 font-semibold text-text-muted hover:text-text dark:hover:text-slate-200"
                        >
                          {col.label}
                          <SortIcon column={col.key} />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-border transition-colors hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800/50"
                    >
                      <td className="px-4 py-3 font-medium text-text dark:text-slate-200">{record.date}</td>
                      <td className="px-4 py-3 text-text-muted">{record.time}</td>
                      <td className="px-4 py-3">{record.predictedCount}</td>
                      <td className="px-4 py-3">{record.actualCount}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          'font-medium',
                          record.accuracy >= 90 ? 'text-success' : record.accuracy >= 80 ? 'text-warning' : 'text-critical'
                        )}>
                          {record.accuracy.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3"><RiskBadge level={record.riskLevel} /></td>
                      <td className="px-4 py-3 text-text-muted">{record.waitingTime} dk</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-text-muted">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length.toLocaleString()} kayıt
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Önceki
                </Button>
                <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                  Sonraki
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
