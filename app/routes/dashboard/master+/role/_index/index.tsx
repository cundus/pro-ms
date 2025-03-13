import { useLoaderData } from '@remix-run/react'

import { columns } from '~/components/data-table/columns/role-columns'
import RoleDataTable from '~/components/data-table/tables/role-table'
import Heading from '~/components/heading'
import { getRoles } from '~/repositories/role.server'

export const loader = async () => {
  const roles = await getRoles()
  return { roles }
}

export default function Index() {
  const { roles } = useLoaderData<typeof loader>()

  return (
    <>
      <Heading title="Role Management" />
      <div className="flex items-center justify-between my-4"></div>
      <RoleDataTable columns={columns} data={roles} />
    </>
  )
}
