import { Bell, Building2, Moon, Palette, Shield, User } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useErData } from '../context/ErDataContext'
import { Button } from '../components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

export function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { stats } = useErData()
  const hospitals = stats?.hospitals ?? []

  const inputClass =
    'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark-border dark:bg-dark-bg dark:text-slate-100'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text dark:text-slate-100">Ayarlar</h1>
        <p className="mt-1 text-sm text-text-muted dark:text-slate-400">
          Acil Servis Yoğunluk Tahmin Sistemi tercihlerinizi yapılandırın
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card elevated>
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <CardTitle>Profil</CardTitle>
                <CardDescription>Hesap bilgileriniz</CardDescription>
              </div>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-text-muted">Ad Soyad</label>
              <input id="name" type="text" defaultValue="Dr. Yönetici Kullanıcı" className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-text-muted">E-posta</label>
              <input id="email" type="email" defaultValue="admin@hastane.edu.tr" className={inputClass} />
            </div>
            <div>
              <label htmlFor="role" className="mb-1.5 block text-xs font-medium text-text-muted">Rol</label>
              <input id="role" type="text" defaultValue="Acil Servis Müdürü" className={inputClass} readOnly />
            </div>
            <Button>Profili Kaydet</Button>
          </div>
        </Card>

        <Card elevated>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <CardTitle>Hastane Yapılandırması</CardTitle>
                <CardDescription>Varsayılan hastane ve departman ayarları</CardDescription>
              </div>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="hospital" className="mb-1.5 block text-xs font-medium text-text-muted">Varsayılan Hastane</label>
              <select id="hospital" className={inputClass}>
                {hospitals.map((h) => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="capacity" className="mb-1.5 block text-xs font-medium text-text-muted">AS Yatak Kapasitesi</label>
              <input id="capacity" type="number" defaultValue={50} className={inputClass} />
            </div>
            <div>
              <label htmlFor="threshold" className="mb-1.5 block text-xs font-medium text-text-muted">Kritik Eşik (%)</label>
              <input id="threshold" type="number" defaultValue={85} className={inputClass} />
            </div>
            <Button>Yapılandırmayı Kaydet</Button>
          </div>
        </Card>

        <Card elevated>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <CardTitle>Bildirimler</CardTitle>
                <CardDescription>Uyarı ve bildirim tercihleri</CardDescription>
              </div>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {[
              { label: 'Kritik kapasite uyarıları', desc: 'AS kritik eşiği aştığında bildir' },
              { label: 'Tahmin güncellemeleri', desc: 'Yeni YZ tahminleri mevcut olduğunda' },
              { label: 'Haftalık rapor hazır', desc: 'Otomatik haftalık rapor oluşturma' },
              { label: 'Personel önerileri', desc: 'YZ önerilen personel değişiklikleri' },
            ].map((item) => (
              <label key={item.label} className="flex items-start gap-3 rounded-xl border border-border p-3 dark:border-dark-border">
                <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 rounded text-primary focus:ring-primary" />
                <div>
                  <p className="text-sm font-medium text-text dark:text-slate-200">{item.label}</p>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>

        <Card elevated>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <CardTitle>Görünüm</CardTitle>
                <CardDescription>Tema ve ekran tercihleri</CardDescription>
              </div>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-text-muted" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-text dark:text-slate-200">Koyu Mod</p>
                  <p className="text-xs text-text-muted">Şu an: {theme === 'dark' ? 'Koyu' : 'Açık'}</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative h-6 w-11 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-slate-300'}`}
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label="Koyu modu aç/kapat"
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-5' : ''}`}
                />
              </button>
            </div>
          </div>
        </Card>

        <Card elevated className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <CardTitle>Güvenlik</CardTitle>
                <CardDescription>Hesap güvenlik ayarları</CardDescription>
              </div>
            </div>
          </CardHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline">Şifre Değiştir</Button>
            <Button variant="outline">İki Faktörlü Doğrulama</Button>
            <Button variant="outline">Erişim Kayıtları</Button>
            <Button variant="outline">API Anahtarları</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
