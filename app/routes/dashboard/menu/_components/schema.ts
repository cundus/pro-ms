import { z, ZodType } from 'zod'

export const menuSchema: ZodType = z.object({
  label: z
    .string()
    .min(2, { message: 'Label must be at least 2 characters.' })
    .nonempty('Label is required'),
  path: z.string().optional(),
  icon: z.string().optional(),
  parent_id: z.number().optional(),
  is_active: z.boolean().optional().default(true),
  permissions: z
    .array(
      z.object({
        role_id: z.number(),
        menu_id: z.number(),
        create: z.boolean(),
        read: z.boolean(),
        update: z.boolean(),
        delete: z.boolean(),
      })
    )
    .optional(),
})

export const NewMenuSchema = z.object({
  id: z.number().optional(),
  label: z
    .string()
    .min(2, {
      message: 'Label must be at least 2 characters.',
    })
    .nonempty('Label is required'),
  path: z.string().optional(),
  parent_id: z.number().optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
  is_active: z.boolean().optional().default(true),
  mode: z.string().optional(),
})
