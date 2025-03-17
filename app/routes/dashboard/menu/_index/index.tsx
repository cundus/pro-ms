import { Menu } from '@prisma/client'
import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { columns } from '~/components/data-table/columns'
import CommonTable from '~/components/data-table/tables'
import Heading from '~/components/heading'
import { getAllMenus } from '~/repositories/menu.server'
import { Columns } from '~/types/columns'
import { guard } from '~/utils/guard.server'

export const loader: LoaderFunction = async ({ request }) => {
  await guard(request)
  const menus = await getAllMenus()
  return Response.json({ menus })
}

function Index() {
  const { menus } = useLoaderData<typeof loader>()

  const column: Columns[] = [
    {
      key: 'label',
      title: 'Label',
      enableSorting: true,
      enableHiding: true,
    },
    {
      key: 'path',
      title: 'Path',
    },
    {
      key: 'parent_id',
      title: 'Parent ID',
      enableSorting: true,
      enableHiding: true,
    },
    {
      key: 'icon',
      title: 'Icon',
    },
    {
      key: 'is_active',
      title: 'Status',
    },
  ]

  return (
    <>
      <Heading title="Menu Management" />
      <div className="flex items-center justify-between my-4"></div>
      <CommonTable
        columns={columns<Menu>(column)}
        data={menus}
        searchBy="label"
      />
    </>
  )
}

export default Index
