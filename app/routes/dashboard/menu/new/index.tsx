import {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import MenuPage from '../_components/page'

import Back from '~/components/data-table/components/back-button'
import Heading from '~/components/heading'
import { getAllMenus } from '~/repositories/menu.server'
import { getAllRoles } from '~/repositories/role.server'
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
  const roles = await getAllRoles()

  return Response.json({ menus, roles })
}

const Index = () => {
  const { menus, roles } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="flex justify-between">
        <Heading title="New Menu" />
        <Back />
      </div>
      <MenuPage page="new" menus={menus} roles={roles} />
    </>
  )
}

export default Index
