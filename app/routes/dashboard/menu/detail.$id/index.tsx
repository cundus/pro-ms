import { useLoaderData } from '@remix-run/react'
import { LoaderFunction, MetaFunction } from '@vercel/remix'

import MenuPage from '../_components/page'

import Back from '~/components/data-table/components/back-button'
import Heading from '~/components/heading'
import { getAllMenus, getMenuById } from '~/repositories/menu.server'
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
  return Response.json({ menus, data })
}

const Index = () => {
  const { menus, data } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="flex justify-between">
        <Heading title="Menu Detail" />
        <Back />
      </div>
      <MenuPage page="detail" menus={menus} data={data} />
    </>
  )
}

export default Index
