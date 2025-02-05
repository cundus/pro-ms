import { useParams } from '@remix-run/react'

import Container from '~/components/Container'

export const meta = () => {
  return [
    { title: 'Detail | Propery Management System' },
    { name: 'description', content: 'Detail Page' },
  ]
}

const Detail = () => {
  const params = useParams()

  return <Container>{params.id}</Container>
}

export default Detail
