import { LoaderFunction } from '@remix-run/node'

import { IMenu } from '~/types/menu'
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

  return Response.json({ menus })
}
