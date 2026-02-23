export type UserRole = 'admin' | 'finance' | 'ops' | 'guest'

export interface UserAccount {
  id: string
  name: string
  email: string
  role: UserRole
  status: 'active' | 'invited' | 'disabled'
  lastSeenAt: string
}
