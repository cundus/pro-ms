//
import { Link } from '@remix-run/react'
import type { MetaFunction } from '@vercel/remix'

import Container from '~/components/Container'

export const meta: MetaFunction = () => {
  return [
    { title: 'Dashboard | Propery Management System' },
    { name: 'description', content: 'Dashboard Page' },
  ]
}

const Dashboard = () => {
  return (
    <Container>
      <Link to="/dashboard/admin/2">Admin</Link>
    </Container>
  )
}

export default Dashboard
