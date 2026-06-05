import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Analytics } from './pages/Analytics'
import { Dashboard } from './pages/Dashboard'
import { HistoricalData } from './pages/HistoricalData'
import { LiveMonitoring } from './pages/LiveMonitoring'
import { MLInsights } from './pages/MLInsights'
import { Predictions } from './pages/Predictions'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="predictions" element={<Predictions />} />
          <Route path="live-monitoring" element={<LiveMonitoring />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="historical" element={<HistoricalData />} />
          <Route path="reports" element={<Reports />} />
          <Route path="ml-insights" element={<MLInsights />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
