import { create } from 'zustand'

export const useUiStore = create((set) => ({
  authMode: 'login',
  setAuthMode: (authMode) => set({ authMode }),
}))
