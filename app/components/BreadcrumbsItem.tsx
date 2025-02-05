// app/components/BreadcrumbsItem.tsx
import { PropsWithChildren } from 'react'
import { Link } from '@remix-run/react'

interface BreadcrumbsItemProps extends PropsWithChildren {
  href: string
}

export const BreadcrumbsItem: React.FC<BreadcrumbsItemProps> = ({
  children,
  href,
}) => {
  return (
    <Link to={href} itemProp="item">
      <span itemProp="name">{children}</span>
    </Link>
  )
}
