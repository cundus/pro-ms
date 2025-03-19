import Back from './data-table/components/back-button'

import { cn } from '~/lib/utils'

const Heading = ({
  title,
  className,
  back,
}: {
  title: string
  className?: string
  back?: boolean
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className={cn('text-2xl font-bold ml-2', className)}>{title}</h1>
      {back && <Back />}
    </div>
  )
}

export default Heading
