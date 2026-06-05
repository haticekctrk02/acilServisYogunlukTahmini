import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { computeErDataStats } from '../data/erDataService'
import type { ErDataStats } from '../types'
import { parseErDatasetCsv } from '../utils/erDatasetParser'

interface ErDataContextType {
  stats: ErDataStats | null
  loading: boolean
  error: string | null
  datasetName: string
}

const ErDataContext = createContext<ErDataContextType | undefined>(undefined)

export function ErDataProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<ErDataStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/er_dataset.csv')
      .then((res) => {
        if (!res.ok) throw new Error('er_dataset.csv yüklenemedi')
        return res.text()
      })
      .then((content) => {
        const visits = parseErDatasetCsv(content)
        if (visits.length === 0) throw new Error('Dataset boş veya okunamadı')
        setStats(computeErDataStats(visits))
        setError(null)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Veri yüklenirken hata oluştu')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <ErDataContext.Provider value={{ stats, loading, error, datasetName: 'er_dataset.csv' }}>
      {children}
    </ErDataContext.Provider>
  )
}

export function useErData() {
  const context = useContext(ErDataContext)
  if (!context) throw new Error('useErData must be used within ErDataProvider')
  return context
}
