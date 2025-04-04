import { prisma } from '~/lib/db.server'
import { PermissionId, PermissionRequest } from '~/types/permission'

export const insertPermission = async (body: PermissionRequest) => {
  return await prisma.rolePermission.create({ data: body })
}

export const getPermissionById = async (body: PermissionId) => {
  return await prisma.rolePermission.findUnique({
    where: { role_id_menu_id: body },
  })
}

export const getPermissionByMenuId = async (id: number) => {
  return await prisma.rolePermission.findMany({ where: { menu_id: id } })
}

export const insertPermissionBulk = async (body: PermissionRequest[]) => {
  return await prisma.rolePermission.createMany({ data: body })
}

export const updatePermissionBulk = async (body: PermissionRequest[]) => {
  return await Promise.all(
    body.map(({ role_id, menu_id, ...rest }) =>
      prisma.rolePermission.update({
        where: { role_id_menu_id: { role_id, menu_id } },
        data: rest,
      })
    )
  )
}

export const deletePermissionBulk = async (body: PermissionId[]) => {
  return await prisma.rolePermission.deleteMany({ where: { OR: body } })
}
