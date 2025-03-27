import { redirect } from '@vercel/remix'

// import { getUserDetails } from '~/repositories/user.server'
import { getUserSession, logout } from '~/sessions/session.server'

export const guard = async (request: Request) => {
  try {
    const sessionHeader = await getUserSession(request)
    // const currentUrl = new URL(request.url).pathname

    if (!sessionHeader) {
      throw redirect('/login', {})
    }

    // const userDetail = await getUserDetails({ id: sessionHeader.user.id })

    // if (!userDetail) {
    //   throw await logout({ request })
    // }

    return sessionHeader
  } catch (error) {
    throw await logout({ request })
  }
}
