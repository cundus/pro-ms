import { cn } from '~/lib/utils'

const Heading = ({
  title,
  className,
}: {
  title: string
  className?: string
}) => {
  return <h1 className={cn('text-2xl font-bold ml-2', className)}>{title}</h1>
}

export default Heading
