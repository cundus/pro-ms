import { Company } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { ActionComponent } from '../components/action'
import { DataTableColumnHeader } from '../components/header'
import { HeaderSelector, RowSelector } from '../components/row-selection'

export const columns: ColumnDef<Company>[] = [
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
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="City"
        className="justify-center"
      />
    ),
    cell({ row }) {
      return (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          {row.original.city}
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
