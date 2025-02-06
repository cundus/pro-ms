import { ActionFunction, LoaderFunction } from '@remix-run/node'

import { logout } from '~/server/sessions/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  return logout({ request })
}

export const action: ActionFunction = async ({ request }) => {
  return logout({ request })
}
