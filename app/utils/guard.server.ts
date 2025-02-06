import { redirect } from '@remix-run/node'

import { getUserDetails } from '~/server/services/user.server'
import { getUserSession } from '~/server/sessions/session.server'

export const guard = async (request: Request) => {
  const sessionHeader = await getUserSession(request)
  const currentUrl = new URL(request.url).pathname

  console.log({ currentUrl, sessionHeader })

  if (!sessionHeader) {
    throw redirect('/login', {})
  }

  const userDetail = await getUserDetails({ id: sessionHeader.user_id })

  console.log({ userDetail })

  return userDetail
}
