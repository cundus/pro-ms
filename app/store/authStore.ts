import { create } from 'zustand'

import { AuthActions, AuthStates } from './types/auth-store'

const useAuthStore = create<AuthStates & AuthActions>((set) => ({
  user: null,
  setUser(user) {
    set({ user })
  },
}))

export default useAuthStore
