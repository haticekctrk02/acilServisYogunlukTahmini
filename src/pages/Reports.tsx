import {
  BarChart3,
  Building2,
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

const reports = [
  {
    title: 'Haftalık Rapor',
    description: 'Tahminler ve gerçekleşenlerle kapsamlı haftalık AS performans özeti',
    icon: Calendar,
    color: '#2563EB',
    action: 'Haftalık Rapor Oluştur',
  },
  {
    title: 'Aylık Rapor',
    description: 'Aylık kapasite analizi, trendler ve personel önerileri',
    icon: BarChart3,
    color: '#0EA5E9',
    action: 'Aylık Rapor Oluştur',
  },
  {
    title: 'Tahmin Performansı',
    description: 'ML model doğruluk metrikleri, hata analizi ve iyileştirme öngörüleri',
    icon: TrendingUp,
    color: '#22C55E',
    action: 'Performans Raporu Oluştur',
  },
  {
    title: 'Hastane Kapasitesi',
    description: 'Yatak kullanımı, departman kapasitesi ve kaynak tahsisi raporu',
    icon: Building2,
    color: '#F59E0B',
    action: 'Kapasite Raporu Oluştur',
  },
]

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text dark:text-slate-100">Raporlar</h1>
          <p className="mt-1 text-sm text-text-muted dark:text-slate-400">
            Yönetici raporları oluşturun ve dışa aktarın
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4" aria-hidden="true" />
            PDF İndir
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
            Excel İndir
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.title} elevated className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${report.color}15` }}
                >
                  <report.icon className="h-6 w-6" style={{ color: report.color }} aria-hidden="true" />
                </div>
                <div>
                  <CardTitle>{report.title}</CardTitle>
                  <CardDescription className="mt-1">{report.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <div className="mt-auto flex gap-2 pt-2">
              <Button className="flex-1">
                <Download className="h-4 w-4" aria-hidden="true" />
                {report.action}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card elevated>
        <CardHeader>
          <CardTitle>Son Raporlar</CardTitle>
          <CardDescription>İndirmeye hazır daha önce oluşturulmuş raporlar</CardDescription>
        </CardHeader>
        <div className="space-y-2">
          {[
            { name: 'Haftalık Rapor - 26 Mayıs 2026', date: '2 Haziran 2026', size: '2,4 MB' },
            { name: 'Aylık Rapor - Mayıs 2026', date: '1 Haziran 2026', size: '5,8 MB' },
            { name: 'Tahmin Performansı - 2. Çeyrek 2026', date: '28 Mayıs 2026', size: '3,1 MB' },
          ].map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-text dark:text-slate-200">{r.name}</p>
                  <p className="text-xs text-text-muted">{r.date} · {r.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" aria-hidden="true" />
                İndir
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
