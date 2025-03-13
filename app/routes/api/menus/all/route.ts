import { LoaderFunction } from '@remix-run/node'

import { getAllMenus } from '~/repositories/menu.server'
import { guard } from '~/utils/guard.server'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await guard(request)

  if (session.user.role?.name !== 'Super Admin') {
    return Response.json(
      { message: 'You are not authorized to access this resource!' },
      { status: 401 }
    )
  }

  const menus = await getAllMenus()

  return Response.json({ menus })
}
