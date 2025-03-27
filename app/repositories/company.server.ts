import { prisma } from '~/lib/db.server'

export const getCompanies = async () => {
  return await prisma.company.findMany({
    where: {
      is_active: true,
    },
    orderBy: { name: 'asc' },
  })
}
