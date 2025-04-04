import React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { FormControl } from '~/components/ui/form'
import { Label } from '~/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { cn } from '~/lib/utils'
import usePermissionStore from '~/store/permission'
import { Role } from '~/types/permission'

type ModalProps = {
  roles: Role[]
  children: JSX.Element
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function PermissionModal({
  roles,
  children,
  open,
  setOpen,
}: ModalProps) {
  const { permissions, setPermissions, data } = usePermissionStore()
  const [openPop, setOpenPop] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [form, setForm] = React.useState(data)

  const handleSubmit = () => {
    if (!form.role.id || !form.role_id) {
      return setMessage('Please Select One Role')
    }

    if (!data?.role_id) {
      const idx = permissions.findIndex((item) => item.role_id === form.role_id)

      if (idx === -1) setPermissions([...permissions, form])
      else return setMessage('Role already exists')
    } else {
      const idx = permissions.findIndex((item) => item.role_id === form.role_id)
      const newPermission = [...permissions]
      newPermission[idx] = form

      setPermissions(newPermission)
    }

    setForm({
      role_id: 0,
      role: { id: 0, name: '' },
      menu_id: 0,
      create: false,
      update: false,
      delete: false,
      read: false,
    })
    setMessage('')
    setOpen(false)
  }

  React.useEffect(() => {
    setForm(data)
  }, [data])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {!data?.role_id ? 'Add' : 'Edit'} Permission
          </DialogTitle>
        </DialogHeader>
        {message && <p className="">{message}</p>}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="role" className="text-left w-1/3">
                Role
              </Label>
              <Popover open={openPop} onOpenChange={setOpenPop}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-2/3 justify-between"
                      id="role"
                      onClick={() => setOpenPop(!openPop)}
                    >
                      {form.role_id
                        ? roles!.find((role) => role.id === form.role_id)?.name
                        : 'Select Role...'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Role..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No Role found.</CommandEmpty>
                      <CommandGroup>
                        {roles &&
                          roles.map((role) => (
                            <CommandItem
                              key={role.id}
                              value={role.name}
                              onSelect={() => {
                                setForm({
                                  ...form,
                                  role_id: role.id,
                                  role,
                                })
                                setOpenPop(false)
                              }}
                            >
                              {role.name}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  form.role_id === role.id
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
            </div>
            <div className="grid grid-cols-3 items-center gap-10">
              <Label htmlFor="create" className="py-2">
                Create
              </Label>
              <Checkbox
                id="create"
                checked={form.create}
                onCheckedChange={() =>
                  setForm({
                    ...form,
                    create: !form.create,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-10">
              <Label htmlFor="read" className="py-2">
                Read
              </Label>
              <Checkbox
                id="read"
                checked={form.read}
                onCheckedChange={() =>
                  setForm({
                    ...form,
                    read: !form.read,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-10">
              <Label htmlFor="update" className="py-2">
                Update
              </Label>
              <Checkbox
                id="update"
                checked={form.update}
                onCheckedChange={() =>
                  setForm({
                    ...form,
                    update: !form.update,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-10">
              <Label htmlFor="delete" className="py-2">
                Delete
              </Label>
              <Checkbox
                id="delete"
                checked={form.delete}
                onCheckedChange={() =>
                  setForm({
                    ...form,
                    delete: !form.delete,
                  })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
