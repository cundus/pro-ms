import React from 'react'
import { Role } from '@prisma/client'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { PermissionModal } from './modal'

import DataTable from '~/components/data-table'
import { DataTablePagination } from '~/components/data-table/components/pagination'
import { Button } from '~/components/ui/button'
import usePermissionStore from '~/store/permission'
import { Permission } from '~/types/permission'

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  roles: Role[]
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const PermissionCtx = React.createContext<Permission[]>([])

function PermissionTable<Tdata, TValue>({
  columns,
  roles,
  open,
  setOpen,
}: TableProps<Tdata, TValue>) {
  const { permissions, setData } = usePermissionStore()
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data: permissions as Tdata[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  const data = {
    role_id: 0,
    role: { id: 0, name: '' },
    menu_id: 0,
    create: false,
    read: false,
    update: false,
    delete: false,
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <PermissionModal roles={roles} open={open} setOpen={setOpen}>
            <Button onClick={() => setData(data)}>Add Role Permission</Button>
          </PermissionModal>
        </div>
        <div className="flex items-center space-x-2"></div>
      </div>
      <DataTable table={table} />
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </>
  )
}

export default PermissionTable
