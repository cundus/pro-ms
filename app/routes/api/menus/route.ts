import { LoaderFunction } from '@remix-run/node'

import { IMenu } from '~/types/menu'
import { guard } from '~/utils/guard.server'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await guard(request)

  const menus = session.menus as IMenu[]

  return Response.json({ menus })
}
