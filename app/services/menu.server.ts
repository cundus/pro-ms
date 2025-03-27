import { redirect } from '@vercel/remix'

import {
  countMenuById,
  createMenu,
  deleteMenu,
  updateMenu,
} from '~/repositories/menu.server'
import { MenuBody } from '~/types/menu'

export const newMenuService = async (request: Request) => {
  const formData = await request.formData()
  const body = Object.fromEntries(formData) as unknown as MenuBody

  Object.keys(body).forEach((k) => {
    const key = k as keyof MenuBody
    if (body[key] === 'undefined') {
      // delete body[key]
      body[key] = undefined
    } else if (body[key] === 'true' || body[key] === 'false') {
      body[key] = body[key] === 'true'
    } else if (Number(body[key])) {
      body[key] = Number(body[key])
    } else if (key === 'mode') {
      delete body[key]
    }
  })

  if (body.parent_id) {
    const existingParent = await countMenuById(body.parent_id)

    if (!existingParent)
      return Response.json({ message: 'Parent menu does not exist!' })
  }

  await createMenu(body)

  return redirect('/dashboard/menu')
}

export const editMenuService = async (request: Request) => {
  const formData = await request.formData()
  const body = Object.fromEntries(formData) as unknown as MenuBody
  const id = Number(body.id)

  Object.keys(body).forEach((k) => {
    const key = k as keyof MenuBody
    if (body[key] === 'undefined') {
      // delete body[key]
      body[key] = undefined
    } else if (body[key] === 'true' || body[key] === 'false') {
      body[key] = body[key] === 'true'
    } else if (Number(body[key])) {
      body[key] = Number(body[key])
    } else if (key === 'mode') {
      delete body[key]
    } else if (key === 'id') {
      delete body[key]
    }
  })

  await updateMenu(id, body)

  return redirect('/dashboard/menu')
}

export const deleteMenuService = async (id: number) => {
  const existingMenu = await countMenuById(id)

  if (!existingMenu) return Response.json({ message: 'Menu does not exist!' })

  await deleteMenu(id)

  return redirect('/dashboard/menu')
}
