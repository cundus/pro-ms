import { redirect } from '@remix-run/node'

import {
  countMenuById,
  createMenu,
  deleteMenu,
  updateMenu,
} from '~/repositories/menu.server'
import {
  deletePermissionBulk,
  getPermissionByMenuId,
  insertPermissionBulk,
  updatePermissionBulk,
} from '~/repositories/permission.server'
import { MenuBody } from '~/types/menu'
import { PermissionId, PermissionRequest } from '~/types/permission'

export const newMenuService = async (request: Request) => {
  const formData = await request.formData()
  const body = Object.fromEntries(formData) as Record<string, unknown>

  Object.keys(body).forEach((k) => {
    if (k === 'permissions') {
      body[k] = JSON.parse(body[k] as string)
      return
    }
    const key = k as keyof MenuBody

    if (typeof body[key] === 'string') {
      if (body[key] === 'undefined') {
        delete body[key]
      } else if (body[key] === 'true' || body[key] === 'false') {
        body[key] = (body[key] === 'true') as boolean
      } else if (!isNaN(Number(body[key]))) {
        body[key] = Number(body[key]) as unknown as MenuBody[typeof key]
      }
    }
  })

  if (body.parent_id) {
    const existingParent = await countMenuById((body as MenuBody).parent_id!)

    if (!existingParent)
      return Response.json({ message: 'Parent menu does not exist!' })
  }

  let bodyPermit: Record<string, unknown>[] = []
  if (body.permissions)
    bodyPermit = body.permissions as Record<string, unknown>[]

  delete body.permissions
  const menu = await createMenu(body as MenuBody)

  if (!menu) return Response.json({ message: 'Failed to create menu!' })
  else {
    bodyPermit = bodyPermit.map((p) => {
      delete p.role
      return {
        ...p,
        menu_id: menu.id,
      }
    })

    if (bodyPermit.length)
      await insertPermissionBulk(bodyPermit as PermissionRequest[])
  }

  return redirect('/dashboard/menu')
}

export const editMenuService = async (request: Request) => {
  const formData = await request.formData()
  const body = Object.fromEntries(formData) as Record<string, unknown>
  const id = Number(body.id)

  Object.keys(body).forEach((k) => {
    if (k === 'permissions') {
      body[k] = JSON.parse(body[k] as string)
      return
    }
    const key = k as keyof MenuBody

    if (typeof body[key] === 'string') {
      if (key === 'id' || body[key] === 'undefined') {
        delete body[key]
      } else if (body[key] === 'true' || body[key] === 'false') {
        body[key] = body[key] === 'true'
      } else if (Number(body[key])) {
        body[key] = Number(body[key])
      }
    }
  })

  let bodyPermit: Record<string, unknown>[] = []
  if (body.permissions)
    bodyPermit = body.permissions as Record<string, unknown>[]

  delete body.permissions
  await updateMenu(id, body as MenuBody)

  const existingPermit = await getPermissionByMenuId(id)
  const menuPermitId: PermissionId[] = []
  const newPermit: PermissionRequest[] = []

  bodyPermit = bodyPermit.filter((p) => {
    delete p.role
    const permit = { ...p, menu_id: id } as PermissionRequest
    const perm = existingPermit.find((perm) => perm.role_id === permit.role_id)
    if (!perm) newPermit.push(permit)
    else return permit
  })

  for (const permit of existingPermit) {
    const perm = bodyPermit.find((p) => p.role_id === permit.role_id)

    if (!perm) menuPermitId.push({ menu_id: id, role_id: permit.role_id })
  }

  if (menuPermitId.length) await deletePermissionBulk(menuPermitId)
  if (newPermit.length) await insertPermissionBulk(newPermit)
  if (bodyPermit.length)
    await updatePermissionBulk(bodyPermit as PermissionRequest[])

  return redirect('/dashboard/menu')
}

export const deleteMenuService = async (id: number) => {
  const existingMenu = await countMenuById(id)

  if (!existingMenu) return Response.json({ message: 'Menu does not exist!' })

  await deleteMenu(id)

  return redirect('/dashboard/menu')
}
