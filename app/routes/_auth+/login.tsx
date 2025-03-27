/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
  redirect,
} from '@remix-run/node'
import { useActionData, useNavigation, useSubmit } from '@remix-run/react'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

import { GeneralErrorBoundary } from '~/components/error-boundary'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { loginService } from '~/services/auth.server'
import { getUserSession } from '~/sessions/session.server'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  return await loginService(request)
}

export const loader: LoaderFunction = async ({ request }) => {
  const userSession = await getUserSession(request)

  if (userSession) {
    return redirect('/dashboard')
  }

  return null
}

export const meta: MetaFunction = () => {
  return [{ title: 'Login | Propery Management System' }]
}

function Login() {
  const submit = useSubmit()
  const navigation = useNavigation()
  const isPending = navigation.state === 'submitting'
  const actionData = useActionData<typeof action>()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    return submit(data, {
      method: 'post',
    })
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-50">
      <div>
        <h1 className="text-3xl font-bold mb-5">Login</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (data) => console.log(data))}
          className="space-y-6  p-6 rounded-lg w-1/3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    className={clsx({ 'border-red-600': actionData?.message })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      placeholder="Password"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      className={clsx({
                        'border-red-600': actionData?.message,
                      })}
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Icon icon="mdi:eye-off" />
                      ) : (
                        <Icon icon="mdi:eye" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {actionData?.message && (
            <p className="text-red-500 text-sm">{actionData.message}</p>
          )}

          <Button type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}

export default Login
