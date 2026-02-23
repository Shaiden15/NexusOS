import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import { ROUTES } from '@constants/routes'
import { AppLayout } from '@shared/layout/AppLayout'
import { ProtectedRoute } from '@shared/components/ProtectedRoute'

const ProjectsRoute = lazy(() => import('@features/projects'))
const FinanceRoute = lazy(() => import('@features/finance'))
const AnalyticsRoute = lazy(() => import('@features/analytics'))
const UsersRoute = lazy(() => import('@features/users'))
const SettingsRoute = lazy(() => import('@features/settings'))
const AuthRoute = lazy(() => import('@features/users/pages/AuthPortal'))

const toSegment = (path: string) => path.replace(/^\//, '')

export const appRouter = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to={ROUTES.projects} replace /> },
          { path: toSegment(ROUTES.projects), element: <ProjectsRoute /> },
          { path: toSegment(ROUTES.finance), element: <FinanceRoute /> },
          { path: toSegment(ROUTES.analytics), element: <AnalyticsRoute /> },
          { path: toSegment(ROUTES.users), element: <UsersRoute /> },
          { path: toSegment(ROUTES.settings), element: <SettingsRoute /> },
        ],
      },
    ],
  },
  {
    path: ROUTES.auth,
    element: <AuthRoute />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.root} replace />,
  },
])
