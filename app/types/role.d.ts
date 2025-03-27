import { Company, Role } from '@prisma/client'

export interface RoleWithCompany extends Role {
  company: Pick<Company, 'id' | 'name' | 'logo'> | null
}
