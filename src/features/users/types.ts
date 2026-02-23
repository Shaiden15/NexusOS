export type UserRole = "admin" | "manager" | "viewer";

export interface UserAccount {
  id: string
  name: string
  email: string
  role: UserRole
  status: 'active' | 'invited' | 'disabled'
  lastSeenAt: string
}
