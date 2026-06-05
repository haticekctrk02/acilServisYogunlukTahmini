import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { HistoricalRecord, UploadedDataset } from '../types'

const STORAGE_KEY = 'er-uploaded-datasets'

interface DatasetContextType {
  datasets: UploadedDataset[]
  allRecords: HistoricalRecord[]
  addDataset: (name: string, fileName: string, records: HistoricalRecord[]) => void
  removeDataset: (id: string) => void
  activeDatasetId: string | null
  setActiveDatasetId: (id: string | null) => void
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined)

function loadDatasets(): UploadedDataset[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function DatasetProvider({ children }: { children: ReactNode }) {
  const [datasets, setDatasets] = useState<UploadedDataset[]>(loadDatasets)
  const [activeDatasetId, setActiveDatasetId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datasets))
  }, [datasets])

  const addDataset = useCallback((name: string, fileName: string, records: HistoricalRecord[]) => {
    const dataset: UploadedDataset = {
      id: `ds-${Date.now()}`,
      name,
      fileName,
      uploadedAt: new Date().toISOString(),
      rowCount: records.length,
      records: records.map((r, i) => ({ ...r, id: `ds-${Date.now()}-${i}` })),
    }
    setDatasets((prev) => [dataset, ...prev])
    setActiveDatasetId(dataset.id)
  }, [])

  const removeDataset = useCallback((id: string) => {
    setDatasets((prev) => prev.filter((d) => d.id !== id))
    setActiveDatasetId((current) => (current === id ? null : current))
  }, [])

  const allRecords = datasets.flatMap((d) => d.records)

  return (
    <DatasetContext.Provider
      value={{ datasets, allRecords, addDataset, removeDataset, activeDatasetId, setActiveDatasetId }}
    >
      {children}
    </DatasetContext.Provider>
  )
}

export function useDatasets() {
  const context = useContext(DatasetContext)
  if (!context) throw new Error('useDatasets must be used within DatasetProvider')
  return context
}
