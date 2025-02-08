import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import Container from '~/components/Container'
import { columns } from '~/components/data-table/columns/company-columns'
import CompanyDataTable from '~/components/data-table/tables/company-table'

export const loader: LoaderFunction = async () => {
  return Response.json({
    companies: [{ id: 1, name: 'Company 1', city: 'City 1', is_active: true }],
  })
}

function Index() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <Container>
      <h1 className="text-2xl font-bold">Company Management</h1>
      <div className="flex items-center justify-between my-4"></div>
      <CompanyDataTable columns={columns} data={loaderData.companies} />
    </Container>
  )
}

export default Index
