/* eslint-disable react-hooks/exhaustive-deps */
import { LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
import { SidebarProvider } from '~/components/ui/sidebar'
import { guard } from '~/utils/guard.server'

export const loader: LoaderFunction = async ({ request }) => {
  console.log('Guard from _layout dashboard')
  const user = await guard(request)
  console.log('Guard from _layout dashboard')

  return Response.json({ user: user.user })
}

const DashboardLayout = () => {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <div className="min-h-screen">
          <Sidebar />
        </div>
        <div className="h-full w-full flex flex-col gap-4 p-5">
          <Navbar />
          <div className="flex-1">
            <Outlet context={{ userSession: loaderData.user }} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
