import { Link, Outlet } from '@remix-run/react'

const DashboardLayout = () => {
  return (
    <div>
      <h1>DashboardLayout</h1>
      <Link to="/dashboard/admin">go to admin</Link>
      <Outlet />
    </div>
  )
}

export default DashboardLayout
