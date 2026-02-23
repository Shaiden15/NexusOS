export const ROUTES = {
  root: '/',
  projects: '/projects',
  finance: '/finance',
  analytics: '/analytics',
  users: '/users',
  settings: '/settings',
  auth: '/auth',
} as const

export type RouteKey = keyof typeof ROUTES
