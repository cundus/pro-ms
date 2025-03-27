import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Company } from '@prisma/client'
// import { useFetcher } from '@remix-run/react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { NewRoleFormValues, newRoleSchema } from './schema/new-role'

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
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { cn } from '~/lib/utils'
import { IOutletContext } from '~/types/outlet-context'

interface IProps {
  companies: Company[]
  userSession: IOutletContext['userSession']
}

export default function NewForm({ companies, userSession }: IProps) {
  // const fetcher = useFetcher()

  const form = useForm<NewRoleFormValues>({
    resolver: zodResolver(newRoleSchema),
    mode: 'onChange',
    defaultValues: {
      is_global: false,
      is_active: true,
      name: '',
      company_id: undefined,
    },
  })

  const onSubmit = async (data: NewRoleFormValues) => {
    alert(JSON.stringify(data, null, 2))
  }

  useEffect(() => {
    if (userSession.company_id) {
      form.setValue('company_id', +userSession.company_id)
    }
  }, [userSession, form])

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>Company</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={userSession.company_id !== null}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            ' justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? companies.find(
                                (company) => company.id === field?.value
                              )?.id
                            : 'Select company'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput
                          placeholder="Select company..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No company found.</CommandEmpty>
                          <CommandGroup>
                            {companies.map((company) => (
                              <CommandItem
                                value={company.id.toString()}
                                key={company.id}
                                onSelect={() => {
                                  form.setValue('company_id', +company.id)
                                }}
                              >
                                {company.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    company.id.toString() ===
                                      field.value?.toString()
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!userSession.company_id && (
            <FormField
              control={form.control}
              name="is_global"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Is Global</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Is Active</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
