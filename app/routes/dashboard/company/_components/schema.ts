import { z } from 'zod'

const companySchema = z.object({
  name: z.string().nonempty('Name is required'),
  address: z.string().nonempty('Address is required'),
  city: z.string().nonempty('City is required'),
  state: z.string().nonempty('State is required'),
  zip: z.string().nonempty('Zip is required'),
  phone: z.string().nonempty('Phone is required'),
  email: z.string().email('Invalid email'),
})

export { companySchema }
