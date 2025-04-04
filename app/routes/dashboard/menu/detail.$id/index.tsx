import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import MenuPage from '../_components/page'

import Back from '~/components/data-table/components/back-button'
import Heading from '~/components/heading'
import { getAllMenus, getMenuById } from '~/repositories/menu.server'
import { getAllRoles } from '~/repositories/role.server'
import { guard } from '~/utils/guard.server'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Menu Detail',
    },
  ]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await guard(request)

  const menus = await getAllMenus({ label: 'asc' })
  const data = await getMenuById(Number(params.id))

  const roles = await getAllRoles()

  return Response.json({ menus, data, roles })
}

const Index = () => {
  const { menus, data, roles } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="flex justify-between">
        <Heading title="Menu Detail" />
        <Back />
      </div>
      <MenuPage page="detail" menus={menus} data={data} roles={roles} />
    </>
  )
}

export default Index
