import { prisma } from '../lib/db.server'

export const getUserDetails = async ({ id }: { id: number }) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      profile: true,
      company: true,
      role: {
        select: {
          permissions: true,
          name: true,
          is_global: true,
        },
      },
    },
  })
}
