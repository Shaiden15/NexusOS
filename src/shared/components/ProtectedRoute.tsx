import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@constants/routes'
import { useAuth } from '@shared/hooks/useAuth'

interface ProtectedRouteProps {
  allowGuests?: boolean
}

export const ProtectedRoute = ({ allowGuests = false }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (allowGuests || isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to={ROUTES.auth} replace state={{ from: location }} />
}
