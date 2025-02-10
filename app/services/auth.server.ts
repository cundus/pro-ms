import { User } from '@prisma/client'
import { redirect } from '@remix-run/node'
import bcrypt from 'bcryptjs'

import { getMenuAndPermissions } from '../repositories/menu.server'
import { findUser, getUserDetails } from '../repositories/user.server'
import { storeUserSession } from '../sessions/session.server'

import { ISessionDTO } from '~/types/session'

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

  const detailUser = await getUserDetails({ id: existUser.id })

  if (!detailUser) {
    return Response.json({ message: 'User or password is incorrect!' })
  }

  const menus = await getMenuAndPermissions(
    detailUser.role_id,
    detailUser.role.is_global
  )

  const sessionHeader = await storeUserSession({
    user: detailUser,
    menus,
  } as unknown as ISessionDTO)

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': sessionHeader,
    },
  })
}
