import { create } from 'zustand'

const storageKey = 'do1-auth'

function loadAuthState() {
  try {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) {
      return { user: null, token: null, isLoggedIn: false }
    }

    const parsed = JSON.parse(raw)
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null,
      isLoggedIn: Boolean(parsed.token),
    }
  } catch {
    return { user: null, token: null, isLoggedIn: false }
  }
}

function persistAuthState(user, token) {
  if (!token) {
    window.localStorage.removeItem(storageKey)
    return
  }

  window.localStorage.setItem(storageKey, JSON.stringify({ user, token }))
}

export const useAuthStore = create((set, get) => ({
  ...loadAuthState(),
  setSession: ({ user, token }) => {
    persistAuthState(user, token)
    set({ user, token, isLoggedIn: true })
  },
  updateUser: (user) => {
    persistAuthState(user, get().token)
    set({ user })
  },
  logout: () => {
    persistAuthState(null, null)
    set({ user: null, token: null, isLoggedIn: false })
  },
}))
