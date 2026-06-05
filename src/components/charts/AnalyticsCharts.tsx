import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useErData } from '../../context/ErDataContext'
import { ChartContainer } from './ChartContainer'

const COLORS = ['#2563EB', '#0EA5E9', '#22C55E', '#F59E0B', '#EF4444']

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs card-shadow dark:border-dark-border dark:bg-dark-card">
      <p className="mb-1 font-medium text-text dark:text-slate-200">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}

export function HourlyTrendChart() {
  const { stats } = useErData()
  if (!stats) return null

  return (
    <ChartContainer title="Saatlik Hasta Trendi" description="er_dataset.csv — saatlik hasta yoğunluğu">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={stats.hourlyTrend}>
          <defs>
            <linearGradient id="patientsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
          <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="patients" name="Gerçek Hasta" stroke="#2563EB" fill="url(#patientsGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="predicted" name="Tahmin" stroke="#0EA5E9" fill="url(#predictedGrad)" strokeWidth={2} strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function WeeklyHeatmapChart() {
  const { stats } = useErData()
  if (!stats) return null

  const maxVal = Math.max(...stats.weeklyHeatmap.flatMap((d) => d.hours), 1)

  return (
    <ChartContainer title="Haftalık Yoğunluk Haritası" description="er_dataset.csv — gün ve saat bazlı yoğunluk">
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="mb-2 grid grid-cols-[60px_repeat(24,1fr)] gap-0.5">
            <div />
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="text-center text-[9px] text-text-muted">
                {i % 3 === 0 ? `${i}s` : ''}
              </div>
            ))}
          </div>
          {stats.weeklyHeatmap.map((row) => (
            <div key={row.day} className="mb-0.5 grid grid-cols-[60px_repeat(24,1fr)] gap-0.5">
              <div className="flex items-center text-xs font-medium text-text-muted">{row.day}</div>
              {row.hours.map((val, i) => {
                const intensity = val / maxVal
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-sm transition-colors"
                    style={{ backgroundColor: `rgba(37, 99, 235, ${0.1 + intensity * 0.9})` }}
                    title={`${row.day} ${i}:00 - ${val} hasta`}
                  />
                )
              })}
            </div>
          ))}
          <div className="mt-3 flex items-center justify-end gap-2 text-xs text-text-muted">
            <span>Düşük</span>
            <div className="flex gap-0.5">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((o) => (
                <div key={o} className="h-3 w-6 rounded-sm" style={{ backgroundColor: `rgba(37, 99, 235, ${o})` }} />
              ))}
            </div>
            <span>Yüksek</span>
          </div>
        </div>
      </div>
    </ChartContainer>
  )
}

export function MonthlyAdmissionsChart() {
  const { stats } = useErData()
  if (!stats) return null

  return (
    <ChartContainer title="Aylık Başvuru Trendleri" description="er_dataset.csv — aylık başvurular">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={stats.monthlyAdmissions}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="admissions" name="Başvurular" fill="#2563EB" radius={[4, 4, 0, 0]} />
          <Bar dataKey="predictions" name="Tahminler" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function SeasonalUsageChart() {
  const { stats } = useErData()
  if (!stats) return null

  return (
    <ChartContainer title="Mevsimsel AS Kullanımı" description="er_dataset.csv — mevsimsel dağılım">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={stats.seasonalUsage} dataKey="value" nameKey="season" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4}>
            {stats.seasonalUsage.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function PredictionAccuracyChart() {
  const { stats } = useErData()
  if (!stats) return null

  return (
    <ChartContainer title="Tahmin Doğruluğu" description="er_dataset.csv — haftalık doğruluk">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={stats.predictionAccuracy}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
          <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="accuracy" name="Doğruluk %" stroke="#22C55E" strokeWidth={2} dot={{ fill: '#22C55E', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function CapacityUtilizationChart() {
  const { stats } = useErData()
  if (!stats) return null

  return (
    <ChartContainer title="Kapasite Kullanımı" description="er_dataset.csv — departman kapasitesi">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={stats.capacityUtilization} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <YAxis type="category" dataKey="department" tick={{ fontSize: 11 }} stroke="#94a3b8" width={100} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="utilization" name="Kullanım %" radius={[0, 4, 4, 0]}>
            {stats.capacityUtilization.map((entry, i) => (
              <Cell key={i} fill={entry.utilization > 85 ? '#EF4444' : entry.utilization > 70 ? '#F59E0B' : '#22C55E'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
