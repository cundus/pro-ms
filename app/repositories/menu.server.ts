import { prisma } from '../lib/db.server'

import { MenuBody } from '~/types/menu'

export const getMenuAndPermissions = async (
  userRoleId: number,
  isGlobal: boolean
) => {
  const condition = isGlobal
    ? {
        parent_id: null,
      }
    : {
        OR: [
          { permissions: { some: { role_id: userRoleId, read: true } } },
          {
            children: {
              some: {
                permissions: { some: { role_id: userRoleId, read: true } },
              },
            },
          },
        ],
      }

  const childrenCondition = isGlobal
    ? {}
    : { permissions: { some: { role_id: userRoleId } } }

  const menus = await prisma.menu.findMany({
    where: condition,
    include: {
      children: {
        include: {
          permissions: true,
          children: {
            include: { permissions: true },
            where: childrenCondition,
          },
        },
        where: childrenCondition,
      },
    },
    orderBy: { order: 'asc' },
  })

  return menus
}

type OrderParams = {
  [key: string]: string
}

export const getAllMenus = async (orderBy: OrderParams = { id: 'desc' }) => {
  return await prisma.menu.findMany({ orderBy })
}

export const countMenuById = async (id: number) => {
  return await prisma.menu.count({ where: { id, is_active: true } })
}

export const getMenuById = async (id: number) => {
  return await prisma.menu.findUnique({ where: { id } })
}

export const createMenu = async (body: MenuBody) => {
  return await prisma.menu.create({ data: body })
}

export const updateMenu = async (id: number, body: MenuBody) => {
  return await prisma.menu.update({ where: { id }, data: body })
}

export const deleteMenu = async (id: number) => {
  return await prisma.menu.delete({ where: { id } })
}
