import { LoaderFunction, redirect } from '@vercel/remix'

import { deleteMenuService } from '~/services/menu.server'
import { guard } from '~/utils/guard.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  await guard(request)
  await deleteMenuService(Number(params.id))
  return redirect('/dashboard/menu')
}

const Index = () => {
  return <></>
}

export default Index
