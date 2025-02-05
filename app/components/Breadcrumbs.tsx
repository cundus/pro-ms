// app/components/Breadcrumbs.tsx
import { Link, useLocation } from '@remix-run/react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from './ui/breadcrumb'

export const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink asChild>
                <Link to={to}>{value}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
