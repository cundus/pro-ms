import { prisma } from '../lib/db.server'

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

export const getAllMenus = async () => {
  return await prisma.menu.findMany({ orderBy: { id: 'desc' } })
}
