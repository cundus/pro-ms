import { Outlet } from '@remix-run/react'

import Button from '~/components/Button'

const Dashboard = () => {
  return (
    <div>
      <Button />
      <Outlet />
    </div>
  )
}

export default Dashboard
