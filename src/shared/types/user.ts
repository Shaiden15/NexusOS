import type { UserRole } from './auth'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
}
