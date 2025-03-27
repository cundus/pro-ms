import { MetaFunction } from '@remix-run/node'
import { Navigate, Outlet, useOutletContext } from '@remix-run/react'

import Container from '~/components/Container'
import type { IOutletContext } from '~/types/outlet-context'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Role Management',
    },
  ]
}

const MasterLayout = () => {
  const outletContext = useOutletContext<IOutletContext>()

  if (!outletContext?.userSession) {
    return <Navigate to="/logout" />
  }

  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default MasterLayout
