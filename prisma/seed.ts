import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany({})
  await prisma.role.deleteMany({})


  const role = await prisma.role.create({
    data: {
      name: 'Super Admin',
      is_global: true,
    },
  })

  const user = await prisma.user.create({
    data: {
      username: 'superadmin',
      password: await bcrypt.hash('AmsAdmin123!', 10), //AmsAdmin123!
      role: {
        connect: {
          id: role.id,
        },
      },
    },
  })

  console.log({ role, user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
