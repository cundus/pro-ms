import { User } from '@prisma/client'

import { prisma } from '~/lib/db.server'

export const findUser = async (body: User) => {
  return await prisma.user.findUnique({
    where: {
      username: body.username,
    },
    include: {
      profile: true,
      role: true,
      company: true,
    },
  })
}

export const findUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export const createUser = async (body: User) => {
  return await prisma.user.create({
    data: body,
  })
}
