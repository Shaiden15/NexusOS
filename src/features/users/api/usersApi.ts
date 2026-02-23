import type { UserAccount } from '../types'

export const fetchUsers = async (): Promise<UserAccount[]> =>
  Promise.resolve([
    {
      id: 'u-001',
      name: 'Ava Martinez',
      email: 'ava@nexusos.co',
      role: 'admin',
      status: 'active',
      lastSeenAt: new Date().toISOString(),
    },
    {
      id: 'u-002',
      name: 'Noah Patel',
      email: 'noah@nexusos.co',
      role: 'manager',
      status: 'active',
      lastSeenAt: new Date().toISOString(),
    },
    {
      id: 'u-003',
      name: 'Lena Fischer',
      email: 'lena@nexusos.co',
      role: 'viewer',
      status: 'invited',
      lastSeenAt: new Date().toISOString(),
    },
  ])
