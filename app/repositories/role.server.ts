import { prisma } from '~/lib/db.server'
import { RoleWithCompany } from '~/types/role'

export const getRoles = async (): Promise<RoleWithCompany[]> => {
  const roles = await prisma.role.findMany({
    where: {
      is_active: true,
      // NOT: {
      //   is_global: true,
      // },
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          logo: true,
        },
        where: {
          is_active: true,
        },
      },
    },
  })

  return roles as RoleWithCompany[]
}
