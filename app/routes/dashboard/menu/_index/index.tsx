import React from 'react'
import { Menu } from '@prisma/client'

import { columns } from '~/components/data-table/columns'
import Table from '~/components/data-table/tables'
import Heading from '~/components/heading'
import { Columns } from '~/types/columns'

function Index() {
  const [menus, setMenus] = React.useState([])
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

  React.useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('/api/menus/all')
        const data = await response.json()
        setMenus(data.menus)
      } catch (error) {
        console.error('Error fetching menus:', error)
      }
    }

    fetchMenus()
  }, [])

  return (
    <>
      <Heading title="Menu Management" />
      <div className="flex items-center justify-between my-4"></div>
      <Table columns={columns<Menu>(column)} data={menus} searchBy="label" />
    </>
  )
}

export default Index
