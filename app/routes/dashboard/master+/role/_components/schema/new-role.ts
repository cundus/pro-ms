import { z } from 'zod'

export const newRoleSchema = z.object({
  name: z.string().min(3).max(50),
  is_global: z.boolean().default(false).optional(),
  is_active: z.boolean().default(true).optional(),
  company_id: z.number().optional(),
})

export type NewRoleFormValues = z.infer<typeof newRoleSchema>
