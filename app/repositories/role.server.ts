import { prisma } from '~/lib/db.server'

export const getAllRoles = async () => {
  return await prisma.role.findMany({
    where: { is_active: true },
  })
}
