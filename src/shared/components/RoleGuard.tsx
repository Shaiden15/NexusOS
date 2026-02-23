import type { ReactNode } from 'react'
import { useAppStore } from '@app/store'
import type { UserRole } from '@shared/types/auth'

interface RoleGuardProps {
  allowed: UserRole[]
  children: ReactNode
}

export function RoleGuard({ allowed, children }: RoleGuardProps) {
  const user = useAppStore((state) => state.user)

  if (!user || !allowed.includes(user.role)) {
    return <div>Unauthorized</div>
  }

  return <>{children}</>
}
