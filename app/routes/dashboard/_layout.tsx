import { Outlet } from '@remix-run/react'

import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'

const DashboardLayout = () => {
  return (
    <div className="flex w-full">
      <div className="min-h-screen">
        <Sidebar />
      </div>
      <div className="h-full w-full flex flex-col gap-4 p-5">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
