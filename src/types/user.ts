export interface UserProfile {
  id: string
  name: string
  email: string
  role: 'admin' | 'executive' | 'contributor' | 'finance' | 'ops' | 'guest'
}
