import type { UserProfile } from '@nexus-types/user'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: UserProfile
}

export const authenticate = async ({ email }: LoginRequest): Promise<LoginResponse> => {
  // Mocked authentication flow, swap with real backend later.
  return Promise.resolve({
    token: 'mock-token',
    user: {
      id: 'u-001',
      name: 'Ava Martinez',
      email,
      role: email.includes('manager') ? 'manager' : email.includes('viewer') ? 'viewer' : 'admin',
    },
  })
}
