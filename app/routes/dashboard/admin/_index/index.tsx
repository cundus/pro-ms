import type { MetaFunction } from '@remix-run/node'

import Container from '~/components/Container'

export const meta: MetaFunction = () => {
  return [
    { title: 'Admin | Propery Management System' },
    { name: 'description', content: 'Admin Page' },
  ]
}

const DashboardAdmin = () => {
  return <Container>DashboardAdmin</Container>
}

export default DashboardAdmin
