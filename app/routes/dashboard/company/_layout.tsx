import { MetaFunction } from '@remix-run/node'
import { Outlet, useOutletContext } from '@remix-run/react'

import Container from '~/components/Container'
import type { IOutletContext } from '~/types/outlet-context'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Company Management',
    },
  ]
}

const CompanyLayout = () => {
  const outletContext = useOutletContext<IOutletContext>()
  console.log('from company layout', outletContext)

  // if (!outletContext?.userSession) {
  //   return <Navigate to="/logout" />
  // }

  // if (!outletContext.userSession.role?.is_global) {
  //   return <Navigate to="/dashboard" />
  // }
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default CompanyLayout
