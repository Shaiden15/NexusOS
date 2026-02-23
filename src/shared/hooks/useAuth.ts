import { useCallback } from 'react'
import {
  selectIsAuthenticated,
  selectUser,
  useAppStore,
} from '@app/store'
import type { UserProfile } from '@nexus-types/user'

export const useAuth = () => {
  const isAuthenticated = useAppStore(selectIsAuthenticated)
  const user = useAppStore(selectUser)
  const login = useAppStore((state) => state.login)
  const logout = useAppStore((state) => state.logout)

  const authenticate = useCallback(
    (profile: UserProfile, token: string) => {
      login({ user: profile, token })
    },
    [login],
  )

  return { isAuthenticated, user, login: authenticate, logout }
}
