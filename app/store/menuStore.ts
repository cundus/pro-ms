import { create } from 'zustand'

import { MenuActions, MenuStates } from './types/menu-store'

const useMenuStore = create<MenuStates & MenuActions>((set) => ({
  menus: [],
  setMenus: (menus) => set({ menus }),
}))

export default useMenuStore
