import { LoaderFunction } from '@remix-run/node'

import { guard } from '~/utils/guard.server'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await guard(request)
  console.log('from app/routes/api/auth%2B/check/route.ts')

  return Response.json({ user: session.user })
}
