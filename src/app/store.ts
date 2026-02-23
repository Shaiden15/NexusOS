import { type StateCreator, create } from 'zustand'
import { registerTokenProvider } from '@services/apiClient'
import type { UserProfile } from '@shared/types/user'
import type { UserRole } from '@shared/types/auth'

export type ThemeMode = 'light' | 'dark'

interface AuthSlice {
  user: UserProfile | null
  token: string | null
  isAuthenticated: boolean
  login: (payload: { user: UserProfile; token: string }) => void
  logout: () => void
  hasRole: (role: UserRole) => boolean
}

interface ThemeSlice {
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
  toggleTheme: () => void
}

export type AppStore = AuthSlice & ThemeSlice

const THEME_STORAGE_KEY = 'nexusos-theme'

const readStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'
  }
  return (window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) ?? 'light'
}

const persistTheme = (mode: ThemeMode) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  }
}

const createAuthSlice: StateCreator<AppStore, [], [], AuthSlice> = (set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: ({ user, token }) =>
    set(() => ({
      user,
      token,
      isAuthenticated: true,
    })),
  logout: () =>
    set(() => ({
      user: null,
      token: null,
      isAuthenticated: false,
    })),
  hasRole: (role: UserRole) => {
    const { user } = get()
    return user?.role === role
  },
})

const createThemeSlice: StateCreator<AppStore, [], [], ThemeSlice> = (set, get) => ({
  theme: readStoredTheme(),
  setTheme: (mode) => {
    if (get().theme === mode) return
    persistTheme(mode)
    set({ theme: mode })
  },
  toggleTheme: () =>
    set((state) => {
      const nextTheme: ThemeMode = state.theme === 'light' ? 'dark' : 'light'
      persistTheme(nextTheme)
      return { theme: nextTheme }
    }),
})

export const useAppStore = create<AppStore>((...args) => ({
  ...createAuthSlice(...args),
  ...createThemeSlice(...args),
}))

registerTokenProvider(() => useAppStore.getState().token)

export const selectIsAuthenticated = (state: AppStore) => state.isAuthenticated
export const selectUser = (state: AppStore) => state.user
export const selectTheme = (state: AppStore) => state.theme
