import { ActionFunction, LoaderFunction } from '@vercel/remix'

import { logout } from '~/sessions/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  return logout({ request })
}

export const action: ActionFunction = async ({ request }) => {
  return logout({ request })
}
