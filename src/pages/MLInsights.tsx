import { Brain, Target } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartContainer } from '../components/charts/ChartContainer'
import { useErData } from '../context/ErDataContext'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { LoadingState } from '../components/ui/LoadingState'

const FEATURE_COLORS = ['#2563EB', '#0EA5E9', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

export function MLInsights() {
  const { stats, loading, error, datasetName } = useErData()

  if (loading) return <LoadingState />
  if (error || !stats) return <div className="text-critical">{error}</div>

  const metricCards = [
    { label: 'Model Doğruluğu', value: `${stats.mlMetrics.accuracy}%`, color: '#22C55E' },
    { label: 'Kesinlik (Precision)', value: `${stats.mlMetrics.precision}%`, color: '#2563EB' },
    { label: 'Duyarlılık (Recall)', value: `${stats.mlMetrics.recall}%`, color: '#0EA5E9' },
    { label: 'RMSE', value: stats.mlMetrics.rmse.toString(), color: '#F59E0B' },
    { label: 'MAE', value: stats.mlMetrics.mae.toString(), color: '#EF4444' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text dark:text-slate-100">
          Makine Öğrenmesi Analizleri
        </h1>
        <p className="mt-1 text-sm text-text-muted dark:text-slate-400">
          {stats.totalVisits.toLocaleString('tr-TR')} kayıt üzerinden hesaplanan metrikler · {datasetName}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metricCards.map((metric) => (
          <Card key={metric.label} elevated className="text-center">
            <p className="text-xs font-medium text-text-muted">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold" style={{ color: metric.color }}>
              {metric.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartContainer title="Özellik Önemi" description="er_dataset.csv özellikleri">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stats.featureImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
              <XAxis type="number" domain={[0, 0.35]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="feature" tick={{ fontSize: 11 }} stroke="#94a3b8" width={150} />
              <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(1)}%`} />
              <Bar dataKey="importance" name="Önem" radius={[0, 4, 4, 0]}>
                {stats.featureImportance.map((_, i) => (
                  <Cell key={i} fill={FEATURE_COLORS[i % FEATURE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <Card elevated>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <CardTitle>Model Bilgileri</CardTitle>
                <CardDescription>er_dataset.csv ile eğitilmiş model</CardDescription>
              </div>
            </div>
          </CardHeader>

          <div className="space-y-4">
            {[
              { label: 'Veri Seti', value: datasetName },
              { label: 'Toplam Kayıt', value: stats.totalVisits.toLocaleString('tr-TR') },
              { label: 'Hastane Sayısı', value: String(stats.hospitals.length) },
              { label: 'Ort. Bekleme', value: `${stats.avgWaitTime} dk` },
              { label: 'Özellikler', value: '7 girdi değişkeni' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-border p-3 dark:border-dark-border">
                <span className="text-sm text-text-muted">{item.label}</span>
                <span className="text-sm font-medium text-text dark:text-slate-200">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-primary">
              <Target className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-semibold">Önemli Bulgu</span>
            </div>
            <p className="mt-2 text-sm text-text-muted dark:text-slate-400">
              Günün saati ve haftanın günü, AS yoğunluğunu en çok etkileyen faktörlerdir. Veri setindeki {stats.totalVisits.toLocaleString('tr-TR')} ziyaret kaydı bu kalıbı doğruluyor.
            </p>
          </div>
        </Card>
      </div>

      <Card elevated>
        <CardHeader>
          <CardTitle>Özellik Etki Dağılımı</CardTitle>
          <CardDescription>er_dataset.csv sütunlarının tahmine etkisi</CardDescription>
        </CardHeader>
        <div className="space-y-3">
          {stats.featureImportance.map((feature, i) => (
            <div key={feature.feature}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-text dark:text-slate-200">{feature.feature}</span>
                <span className="text-text-muted">{(feature.importance * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${feature.importance * 100 * 3.5}%`,
                    backgroundColor: FEATURE_COLORS[i % FEATURE_COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
