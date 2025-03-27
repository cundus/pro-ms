import NewForm from '../_components/new-form'

import Heading from '~/components/heading'

export default function NewRole() {
  return (
    <>
      <Heading title="New Role" back />
      <div className="flex items-center justify-between my-4"></div>
      <NewForm />
    </>
  )
}
