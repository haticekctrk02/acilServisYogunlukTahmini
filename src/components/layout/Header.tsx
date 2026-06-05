import {
  Bell,
  Building2,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Sun,
  User,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useErData } from '../../context/ErDataContext'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../utils/cn'

interface HeaderProps {
  onMenuClick: () => void
  sidebarCollapsed: boolean
}

export function Header({ onMenuClick, sidebarCollapsed }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { stats } = useErData()
  const hospitals = stats?.hospitals ?? []
  const [time, setTime] = useState(new Date())
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0] ?? { id: '1', name: 'Yükleniyor...', region: '' })
  const [showHospitalMenu, setShowHospitalMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (hospitals.length > 0 && selectedHospital.name === 'Yükleniyor...') {
      setSelectedHospital(hospitals[0])
    }
  }, [hospitals, selectedHospital.name])

  const notifications = [
    { id: 1, title: 'Yüksek AS doluluk uyarısı', time: '2 dk önce', type: 'critical' },
    { id: 2, title: 'Tahmin modeli güncellendi', time: '15 dk önce', type: 'info' },
    { id: 3, title: 'Haftalık rapor hazır', time: '1 saat önce', type: 'success' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md transition-all duration-300 dark:border-dark-border dark:bg-dark-card/80 lg:px-6',
        sidebarCollapsed ? 'lg:left-[72px]' : 'lg:left-64'
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-text-muted hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          aria-label="Menüyü aç"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden sm:block">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Hasta, rapor veya tahmin ara..."
            className="w-64 rounded-xl border border-border bg-background py-2 pl-10 pr-4 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 lg:w-80 dark:border-dark-border dark:bg-dark-bg dark:text-slate-100"
            aria-label="Ara"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-xl border border-border px-3 py-1.5 text-sm font-medium text-text dark:border-dark-border md:flex">
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-success" aria-hidden="true" />
          <time dateTime={time.toISOString()}>
            {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </time>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowHospitalMenu(!showHospitalMenu)}
            className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800"
            aria-expanded={showHospitalMenu}
            aria-haspopup="listbox"
          >
            <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="hidden max-w-[140px] truncate sm:inline">{selectedHospital.name}</span>
            <ChevronDown className="h-4 w-4 text-text-muted" aria-hidden="true" />
          </button>
          {showHospitalMenu && (
            <div
              className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card py-1 card-shadow-elevated dark:border-dark-border dark:bg-dark-card"
              role="listbox"
            >
              {hospitals.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setSelectedHospital(h)
                    setShowHospitalMenu(false)
                  }}
                  className={cn(
                    'flex w-full flex-col px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800',
                    selectedHospital.id === h.id && 'bg-primary/5 text-primary'
                  )}
                  role="option"
                  aria-selected={selectedHospital.id === h.id}
                >
                  <span className="font-medium">{h.name}</span>
                  <span className="text-xs text-text-muted">{h.region}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl p-2 text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Bildirimler"
            aria-expanded={showNotifications}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-critical" aria-hidden="true" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card py-2 card-shadow-elevated dark:border-dark-border dark:bg-dark-card">
              <p className="px-4 py-2 text-sm font-semibold text-text dark:text-slate-100">Bildirimler</p>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <span
                    className={cn(
                      'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                      n.type === 'critical' && 'bg-critical',
                      n.type === 'info' && 'bg-primary',
                      n.type === 'success' && 'bg-success'
                    )}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-text dark:text-slate-200">{n.title}</p>
                    <p className="text-xs text-text-muted">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="rounded-xl p-2 text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label={theme === 'dark' ? 'Açık moda geç' : 'Koyu moda geç'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-expanded={showProfileMenu}
            aria-haspopup="menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
            <span className="hidden text-sm font-medium text-text lg:inline dark:text-slate-200">
              Dr. Yönetici
            </span>
            <ChevronDown className="hidden h-4 w-4 text-text-muted lg:block" aria-hidden="true" />
          </button>
          {showProfileMenu && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card py-1 card-shadow-elevated dark:border-dark-border dark:bg-dark-card"
              role="menu"
            >
              {['Profil', 'Tercihler', 'Çıkış Yap'].map((item) => (
                <button
                  key={item}
                  className="w-full px-4 py-2 text-left text-sm text-text hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  role="menuitem"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
