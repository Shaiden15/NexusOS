import { Suspense, type ReactNode } from 'react'
import { ThemeProvider } from '@shared/components/ThemeProvider'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'
import { SuspenseFallback } from '@shared/components/SuspenseFallback'

interface AppProvidersProps {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <ErrorBoundary>
      <Suspense fallback={<SuspenseFallback />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  </ThemeProvider>
)
