import { Navigate, Outlet, useOutletContext } from '@remix-run/react'
import { MetaFunction } from '@vercel/remix'

import Container from '~/components/Container'
import type { IOutletContext } from '~/types/outlet-context'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Menu Management',
    },
  ]
}

const MenuLayout = () => {
  const outletContext = useOutletContext<IOutletContext>()

  if (!outletContext.userSession.role?.is_global) {
    return <Navigate to="/dashboard" />
  }
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default MenuLayout
