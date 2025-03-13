// import { useForm } from 'react-hook-form'
import { Form } from '@remix-run/react'

// import { z } from 'zod'
// import DetailForm from '../_components/forms/detail-form'
// import { companySchema } from '../_components/schema'
import Heading from '~/components/heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

const NewCompany = () => {
  // const form = useForm<z.infer<typeof companySchema>>({
  //   defaultValues: {
  //     name: '',
  //     address: '',
  //     city: '',
  //     state: '',
  //     zip: '',
  //     phone: '',
  //     email: '',
  //   },
  // })

  return (
    <>
      <Heading title="New Company" />
      <div className="flex items-center justify-between my-4"></div>
      <Form method="post">
        <Tabs defaultValue="detail">
          <TabsList className="grid w-full md:w-1/2 grid-cols-2">
            <TabsTrigger value="detail">Detail</TabsTrigger>
            <TabsTrigger value="config">Configs</TabsTrigger>
          </TabsList>
          <TabsContent value="detail">
            {/* <DetailForm form={form} /> */}
          </TabsContent>
          <TabsContent value="config">config</TabsContent>
        </Tabs>
      </Form>
    </>
  )
}

export default NewCompany
