import { create } from 'zustand'

import { Permission } from '~/types/permission'

interface PermissionState {
  permissions: Permission[]
  data: Permission
  setPermissions: (permissions: Permission[]) => void
  setData: (data: Permission) => void
}

const usePermissionStore = create<PermissionState>((set) => ({
  permissions: [],
  data: {
    role_id: 0,
    role: { id: 0, name: '' },
    menu_id: 0,
    create: false,
    update: false,
    delete: false,
    read: false,
  },
  setPermissions: (permissions: Permission[]) => set({ permissions }),
  setData: (data: Permission) => set({ data }),
}))

export default usePermissionStore
