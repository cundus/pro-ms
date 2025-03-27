import { MetaFunction } from '@remix-run/node'
import { Outlet, useOutletContext } from '@remix-run/react'

import Container from '~/components/Container'
import type { IOutletContext } from '~/types/outlet-context'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Role Management',
    },
  ]
}

const RoleLayout = () => {
  const outletContext = useOutletContext<IOutletContext>()
  console.log('from role layout', outletContext)
  // if (!outletContext?.userSession) {
  //   return <Navigate to="/logout" />
  // }

  return (
    <Container>
      <Outlet context={{ userSession: outletContext.userSession }} />
    </Container>
  )
}

export default RoleLayout
