import { createCookieSessionStorage, redirect } from '@remix-run/node'

export interface UserSessionDTO {
  user_id: number
  role_id: number
  company_id: number | null
}

export const { commitSession, destroySession, getSession } =
  createCookieSessionStorage({
    cookie: {
      name: 'auth_session',
      sameSite: 'lax', // CSRF protection is advised if changing to 'none'
      httpOnly: true,
      secrets: process.env.SESSION_SECRET ? [process.env.SESSION_SECRET] : [],
      secure: process.env.NODE_ENV === 'production',
    },
  })

export const storeUserSession = async (data: UserSessionDTO) => {
  const session = await getSession()
  session.set('user', data)
  return commitSession(session)
}

export const getUserSession = async (
  request: Request
): Promise<UserSessionDTO | null> => {
  const session = await getSession(request.headers.get('Cookie'))
  return session.get('user')
}

export async function logout({
  request,
  redirectTo = '/login',
}: {
  request: Request
  redirectTo?: string
}) {
  const authSession = await getSession(request.headers.get('Cookie'))

  throw redirect(redirectTo, {
    headers: {
      'Set-Cookie': await destroySession(authSession),
    },
  })
}
