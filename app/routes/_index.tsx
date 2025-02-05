import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import { Button } from '~/components/ui/button'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800">
            Welcome to AMS
          </h1>
        </header>

        <main className="flex flex-col items-center gap-4">
          <Link to="/login">
            <Button className="w-full">Login</Button>
          </Link>
        </main>
      </div>
    </div>
  )
}
