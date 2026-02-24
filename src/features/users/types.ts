export type UserRole = 'admin' | 'finance' | 'ops' | 'guest'

export interface UserAccount extends Record<string, unknown> {
  id: string
  name: string
  email: string
  role: UserRole
  status: 'active' | 'invited' | 'disabled'
  lastSeenAt: string
}

export type User = UserAccount
