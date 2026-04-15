import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './styles/tokens.css'
import './index.css'
import { AppErrorBoundary } from './components/common/AppErrorBoundary.jsx'
import { AppProviders } from './app/providers.jsx'
import { AppRouter } from './app/router.jsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </AppErrorBoundary>
  </StrictMode>,
)
