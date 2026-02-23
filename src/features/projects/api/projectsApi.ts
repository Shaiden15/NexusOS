import type { Project } from '../types'

export const fetchProjects = async (): Promise<Project[]> => {
  // Placeholder stub for future REST integration
  return Promise.resolve([
    {
      id: 'p-001',
      name: 'Global Expansion',
      owner: 'Ava Martinez',
      status: 'active',
      budget: 2400000,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'p-002',
      name: 'AI Research Initiative',
      owner: 'Noah Patel',
      status: 'planning',
      budget: 950000,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'p-003',
      name: 'Customer 360',
      owner: 'Lena Fischer',
      status: 'blocked',
      budget: 540000,
      updatedAt: new Date().toISOString(),
    },
  ])
}
