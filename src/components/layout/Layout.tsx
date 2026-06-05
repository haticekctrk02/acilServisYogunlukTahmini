import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <Header
        onMenuClick={() => setMobileOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
      />
      <main
        className={cn(
          'min-h-screen pt-16 transition-all duration-300',
          sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        )}
      >
        <div className="animate-fade-in p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
