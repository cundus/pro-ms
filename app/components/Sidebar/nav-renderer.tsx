import React from 'react'
import { Icon } from '@iconify-icon/react'
import { Link } from '@remix-run/react'
import { ChevronRight } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '../ui/sidebar'

import { IMenu } from '~/types/auth'

const navRenderer = ({ menus }: { menus: IMenu[] }) => {
  return (
    <>
      {menus.map((menu) => {
        if (!menu.parent_id && !menu.path && menu.children && !menu.icon) {
          return (
            <React.Fragment key={menu.id}>
              <SidebarGroup key={menu.id}>
                <SidebarGroupLabel>{menu.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  {menu.children && navRenderer({ menus: menu.children })}
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator />
            </React.Fragment>
          )
        }

        if (menu.parent_id && !menu.path && menu.children) {
          return (
            <SidebarMenu key={menu.id}>
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Icon icon={menu.icon || ''} className="text-[16px]" />
                      <span>{menu.label}</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.children && navRenderer({ menus: menu.children })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          )
        }

        if (!menu.parent_id && menu.path && !!menu.children) {
          return (
            <SidebarGroup key={menu.id}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem key={menu.id}>
                    <SidebarMenuButton asChild>
                      <Link to={menu.path || ''}>
                        <Icon icon={menu.icon || ''} className="text-[16px]" />
                        <span>{menu.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        }

        if (menu.parent_id && menu.path && !menu.children) {
          return (
            <SidebarMenuSubItem key={menu.id}>
              <SidebarMenuButton asChild>
                <Link to={menu.path || ''}>
                  <Icon icon={menu.icon || ''} className="text-[16px]" />
                  <span>{menu.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuSubItem>
          )
        }

        return (
          <SidebarMenu key={menu.id}>
            <SidebarMenuItem key={menu.id}>
              <SidebarMenuButton asChild>
                <Link to={menu.path || ''}>
                  <Icon icon={menu.icon || ''} className="text-[16px]" />
                  <span>{menu.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )
      })}
    </>
  )
}

export default navRenderer
