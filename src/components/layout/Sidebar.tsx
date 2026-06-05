import {
  Activity,
  BarChart3,
  Brain,
  ChevronLeft,
  FileText,
  History,
  LayoutDashboard,
  Radio,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { tr } from '../../i18n/tr'
import { cn } from '../../utils/cn'

const navItems = [
  { to: '/', label: tr.nav.dashboard, icon: LayoutDashboard },
  { to: '/predictions', label: tr.nav.predictions, icon: Sparkles },
  { to: '/live-monitoring', label: tr.nav.liveMonitoring, icon: Radio },
  { to: '/analytics', label: tr.nav.analytics, icon: BarChart3 },
  { to: '/historical', label: tr.nav.historical, icon: History },
  { to: '/reports', label: tr.nav.reports, icon: FileText },
  { to: '/ml-insights', label: tr.nav.mlInsights, icon: Brain },
  { to: '/settings', label: tr.nav.settings, icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapse: () => void
  onCloseMobile: () => void
}

export function Sidebar({ collapsed, mobileOpen, onToggleCollapse, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full flex-col border-r border-border bg-card transition-all duration-300 dark:border-dark-border dark:bg-dark-card',
          collapsed ? 'w-[72px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        aria-label="Ana menü"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4 dark:border-dark-border">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Activity className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-text dark:text-slate-100">Acil Servis</p>
                <p className="text-[10px] text-text-muted dark:text-slate-400">Yoğunluk Tahmini</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Activity className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
          )}
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-text-muted hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
            aria-label="Menüyü kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-text-muted hover:bg-slate-100 hover:text-text dark:hover:bg-slate-800 dark:hover:text-slate-200'
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="hidden border-t border-border p-3 lg:block dark:border-dark-border">
          <button
            onClick={onToggleCollapse}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-text-muted transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label={collapsed ? 'Kenar çubuğunu genişlet' : 'Kenar çubuğunu daralt'}
          >
            <ChevronLeft
              className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')}
              aria-hidden="true"
            />
            {!collapsed && <span>{tr.nav.collapse}</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
