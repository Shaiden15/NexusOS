import { ROUTES } from './routes'

export interface NavItem {
  label: string
  path: string
  icon?: string // placeholder for future icon system
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Projects', path: ROUTES.projects, icon: 'layers' },
  { label: 'Finance', path: ROUTES.finance, icon: 'wallet' },
  { label: 'Analytics', path: ROUTES.analytics, icon: 'chart' },
  { label: 'Users', path: ROUTES.users, icon: 'users' },
  { label: 'Settings', path: ROUTES.settings, icon: 'settings' },
]
