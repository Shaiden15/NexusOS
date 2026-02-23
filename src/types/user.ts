import type { UserRole } from '@shared/types/auth'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
}
