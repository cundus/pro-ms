import React, { useMemo } from 'react'
import { Icon } from '@iconify-icon/react'
import { Link, useLocation } from '@remix-run/react'

import navRenderer from './nav-renderer'

import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarSeparator,
  useSidebar,
} from '~/components/ui/sidebar'
import { IMenu } from '~/types/menu'

const Sidebar = () => {
  const { open } = useSidebar()
  const location = useLocation()
  const [menus, setMenus] = React.useState<IMenu[]>([])
  const [loading, setLoading] = React.useState(false)

  // make memoized function
  const isActive = useMemo(() => {
    return (url: string) => {
      return location.pathname === url
    }
  }, [location])

  React.useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/menus')
        const data = await response.json()
        setMenus(data.menus)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching menus:', error)
      }
    }

    fetchMenus()
  }, [])

  return (
    <ShadSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-center gap-2">
              <Icon icon="mdi:home" className="text-2xl" />
              {open && <span className="text-xl">AMS</span>}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {loading ? (
        <SidebarContent>
          <SidebarMenu>
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      ) : (
        <SidebarContent>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive('/dashboard')}>
                    <Link to={'/dashboard'}>
                      <Icon
                        icon="si:dashboard-line"
                        className="text-[16px] text-center"
                      />
                      <span className="">Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {menus.length > 0 && navRenderer({ menus })}
        </SidebarContent>
      )}

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={'/logout'}>Logout</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadSidebar>
  )
}

export default Sidebar
