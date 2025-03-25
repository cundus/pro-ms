import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Menu } from '@prisma/client'
import { ActionFunctionArgs } from '@remix-run/node'
import { useActionData, useNavigation, useSubmit } from '@remix-run/react'
import clsx from 'clsx'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { z } from 'zod'

import { NewMenuSchema } from '../schema'

import { GeneralErrorBoundary } from '~/components/error-boundary'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { cn } from '~/lib/utils'
import { editMenuService, newMenuService } from '~/services/menu.server'

type MenuPageProps = {
  page: 'new' | 'edit' | 'detail'
  menus?: Menu[]
  data?: Menu
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const mode = formData.get('mode')

  if (mode === 'new') {
    return await newMenuService(request)
  } else {
    return await editMenuService(request)
  }
}

const MenuPage = ({ page, menus, data }: MenuPageProps) => {
  const [mode] = React.useState<MenuPageProps['page']>(page)
  const disabled = page === 'detail'

  const submit = useSubmit()
  const navigation = useNavigation()
  const isPending = navigation.state === 'submitting'
  const actionData = useActionData<typeof action>()

  const form = useForm<z.infer<typeof NewMenuSchema>>({
    resolver: zodResolver(NewMenuSchema),
    defaultValues: {
      label: data?.label || '',
      path: data?.path || '',
      icon: data?.icon || '',
      parent_id: data?.parent_id || undefined,
      is_active: data?.is_active || true,
    },
  })

  function onSubmit(body: z.infer<typeof NewMenuSchema>) {
    body.mode = mode
    if (mode === 'edit') body.id = data?.id
    return submit(body, {
      method: 'post',
    })
  }

  return (
    <>
      <div className="flex items-center justify-between my-4"></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="detail">
            <TabsList
              className="grid md:w-1/2 grid-cols-2"
              style={{ width: '100%' }}
            >
              <TabsTrigger value="detail">Detail</TabsTrigger>
              <TabsTrigger value="permission">Permission</TabsTrigger>
            </TabsList>
            <TabsContent value="detail" className="flex flex-col">
              <div className="flex flex-row mb-2">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="label"
                    disabled={disabled}
                    render={({ field }) => (
                      <FormItem className="flex px-3">
                        <FormLabel className="w-1/3 py-5">Label</FormLabel>
                        <FormControl className="w-2/3">
                          <Input
                            {...field}
                            className={clsx({
                              'border-red-600': actionData?.message,
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="path"
                    disabled={disabled}
                    render={({ field }) => (
                      <FormItem className="flex px-3">
                        <FormLabel className="w-1/3 py-5">Path</FormLabel>
                        <FormControl className="w-2/3">
                          <Input
                            {...field}
                            className={clsx({
                              'border-red-600': actionData?.message,
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>
              <div className="flex flex-row mb-2">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="parent_id"
                    render={({ field }) => (
                      <FormItem className="flex px-3">
                        <FormLabel className="w-1/3 py-5">Parent</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                disabled={disabled}
                                className={cn(
                                  'w-[150px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                  'w-2/3'
                                )}
                              >
                                {field.value
                                  ? menus!.find(
                                      (menu) => menu.id === field.value
                                    )?.label
                                  : 'Select Parent...'}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search Parent..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No Parent found.</CommandEmpty>
                                <CommandGroup>
                                  {menus &&
                                    menus.map((menu) => (
                                      <CommandItem
                                        key={menu.id}
                                        value={menu.label}
                                        onSelect={() => {
                                          form.setValue('parent_id', menu.id)
                                        }}
                                      >
                                        {menu.label}
                                        <Check
                                          className={cn(
                                            'ml-auto',
                                            field.value === menu.id
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="icon"
                    disabled={disabled}
                    render={({ field }) => (
                      <FormItem className="flex px-3">
                        <FormLabel className="w-1/3 py-5">Icon</FormLabel>
                        <FormControl className="w-2/3">
                          <Input
                            {...field}
                            className={clsx({
                              'border-red-600': actionData?.message,
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>
              <div className="flex flex-row mb-2">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem className="flex px-3">
                        <FormLabel className="w-1/3 py-5">Active</FormLabel>
                        <FormControl style={{ marginTop: 20 }}>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={clsx({
                              'border-red-600': actionData?.message,
                            })}
                            disabled={disabled}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="permission">Permission</TabsContent>
          </Tabs>

          {actionData?.message && (
            <p className="text-red-500 text-sm">{actionData.message}</p>
          )}

          {page !== 'detail' && (
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Submit'}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  )
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}

export default MenuPage
