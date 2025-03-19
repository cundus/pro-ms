import { useNavigate } from '@remix-run/react'

import { Button } from '~/components/ui/button'

type BackProps = {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined
}

export default function Back(props: BackProps) {
  const navigate = useNavigate()
  return (
    <Button variant={props.variant || 'outline'} onClick={() => navigate(-1)}>
      Back
    </Button>
  )
}
