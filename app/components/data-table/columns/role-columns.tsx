import { ColumnDef } from '@tanstack/react-table'

import { ActionComponent } from '../components/action'
import { DataTableColumnHeader } from '../components/header'
import { HeaderSelector, RowSelector } from '../components/row-selection'

import { RoleWithCompany } from '~/types/role'

export const columns: ColumnDef<RoleWithCompany>[] = [
  {
    id: 'Select',
    header: ({ table }) => <HeaderSelector table={table} />,
    cell: ({ row }) => <RowSelector row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" className="" />
    ),
  },
  {
    accessorKey: 'company',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" className="" />
    ),
    cell({ row }) {
      return (
        <div
          style={{
            textAlign: 'left',
          }}
        >
          {row.original.company?.name || 'Global'}
        </div>
      )
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="justify-center"
      />
    ),
    cell(props) {
      return (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          {props.getValue() ? 'Active' : 'Inactive'}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: () => (
      <div
        style={{
          textAlign: 'right',
        }}
      >
        Action
      </div>
    ),
    cell: ({ row }) => <ActionComponent id={row.original.id} />,
  },
]
