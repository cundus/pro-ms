import { LoaderFunction } from '@remix-run/node'

import { IMenu } from '~/server/types/auth'
import { guard } from '~/utils/guard.server'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await guard(request)

  const menus = session.menus as IMenu[]

  if (session.user.role?.is_global) {
    menus.push({
      id: 0,
      label: 'Company Management',
      path: 'company',
      icon: 'mdi:account-group',
      parent_id: null,
      children: [],
    })
  }
  console.log('menus', JSON.stringify(menus, null, 2))

  return Response.json({ menus })
}
