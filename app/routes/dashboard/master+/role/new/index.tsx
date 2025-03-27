import { LoaderFunction } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'

import NewForm from '../_components/new-form'

import Heading from '~/components/heading'
import { getCompanies } from '~/repositories/company.server'
import { IOutletContext } from '~/types/outlet-context'

export const loader: LoaderFunction = async () => {
  const companies = await getCompanies()
  return { companies }
}

export default function NewRole() {
  const { companies } = useLoaderData<typeof loader>()
  const { userSession } = useOutletContext<IOutletContext>()

  return (
    <>
      <Heading title="New Role" back />
      <div className="flex items-center justify-between my-4"></div>
      <NewForm companies={companies} userSession={userSession} />
    </>
  )
}
