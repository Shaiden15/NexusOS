import { RouterProvider } from 'react-router-dom'
import { AppProviders } from './app/providers.tsx'
import { appRouter } from './app/router.tsx'

const App = () => (
  <AppProviders>
    <RouterProvider router={appRouter} />
  </AppProviders>
)

export default App
