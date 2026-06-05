import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DatasetProvider } from './context/DatasetContext.tsx'
import { ErDataProvider } from './context/ErDataContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ErDataProvider>
        <DatasetProvider>
          <App />
        </DatasetProvider>
      </ErDataProvider>
    </ThemeProvider>
  </StrictMode>,
)
