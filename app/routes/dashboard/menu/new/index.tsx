import { useLoaderData } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunction, MetaFunction } from '@vercel/remix'

import MenuPage from '../_components/page'

import Heading from '~/components/heading'
import { getAllMenus } from '~/repositories/menu.server'
import { newMenuService } from '~/services/menu.server'
import { guard } from '~/utils/guard.server'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Add New Menu',
    },
  ]
}

export const action = async ({ request }: ActionFunctionArgs) => {
  return await newMenuService(request)
}

export const loader: LoaderFunction = async ({ request }) => {
  await guard(request)
  const menus = await getAllMenus({ label: 'asc' })
  return Response.json({ menus })
}

const Index = () => {
  const { menus } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="flex justify-between">
        <Heading title="New Menu" back />
      </div>
      <MenuPage page="new" menus={menus} />
    </>
  )
}

export default Index
