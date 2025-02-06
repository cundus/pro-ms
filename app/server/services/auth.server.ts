import { User } from '@prisma/client'
import { redirect } from '@remix-run/node'
import bcrypt from 'bcryptjs'

import { findUser } from '../repositories/user.server'
import { storeUserSession } from '../sessions/session.server'

export const loginService = async (request: Request) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData) as unknown as User

  const existUser = await findUser(data)
  if (!existUser) {
    return Response.json({ message: 'User or password is incorrect!' })
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    existUser.password
  )

  if (!isPasswordCorrect) {
    return Response.json({ message: 'User or password is incorrect!' })
  }

  const sessionHeader = await storeUserSession({
    user_id: existUser.id,
    role_id: existUser.role_id,
    company_id: existUser.company_id,
  })

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': sessionHeader,
    },
  })
}
