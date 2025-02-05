// app/components/Breadcrumbs.tsx
import { HTMLAttributes } from 'react'
import { Link, useLocation } from '@remix-run/react'

export const Breadcrumbs = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <ol
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      className="flex flex-wrap items-center gap-2.5"
      {...props}
    >
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`

        return (
          <li key={to}>
            <Link to={to}>{value}</Link>
          </li>
        )
      })}
    </ol>
  )
}
