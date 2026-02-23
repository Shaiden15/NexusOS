export type ProjectStatus = 'planning' | 'active' | 'blocked' | 'complete'

export interface Project {
  id: string
  name: string
  owner: string
  status: ProjectStatus
  budget: number
  updatedAt: string
}
