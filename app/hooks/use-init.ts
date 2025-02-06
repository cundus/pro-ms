import useMenuStore from '~/store/menuStore'
import { IUserDetail } from '~/store/types/auth-store'

export const useInit = () => {
  // const userStore = useAuthStore()
  const menuStore = useMenuStore()
  if (typeof window !== 'undefined') {
    return
  }

  return (user: IUserDetail) => {
    if (user.role?.is_global) {
      menuStore.setMenus([])
    }
  }
}
