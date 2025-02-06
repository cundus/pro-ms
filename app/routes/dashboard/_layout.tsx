/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
import { SidebarProvider } from '~/components/ui/sidebar'
import useAuthStore from '~/store/authStore'
import { guard } from '~/utils/guard.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await guard(request)

  return Response.json({ user })
}

const DashboardLayout = () => {
  const loaderData = useLoaderData<typeof loader>()
  const authStore = useAuthStore()

  useEffect(() => {
    console.log(loaderData)
    if (loaderData.user) {
      authStore.setUser(loaderData.user)
    }
  }, [])

  return (
    <SidebarProvider>
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
    </SidebarProvider>
  )
}

export default DashboardLayout
