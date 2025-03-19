import { ReactNode } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { ActionComponent } from '../components/action'
import { DataTableColumnHeader } from '../components/header'
import { HeaderSelector, RowSelector } from '../components/row-selection'

import { Columns } from '~/types/columns'

export function columns<T extends Record<string, ReactNode>>(
  cols: Columns[],
  actions: boolean = true
): ColumnDef<T>[] {
  const rows: ColumnDef<T>[] = [
    {
      id: 'Select',
      header: ({ table }) => <HeaderSelector table={table} />,
      cell: ({ row }) => <RowSelector row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
  ]

  cols.forEach((col) => {
    if (col.key === 'is_active') {
      rows.push({
        accessorKey: col.key,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={col.title}
            className={col.style?.header || ''}
          />
        ),
        cell: (props) => (
          <div style={col.style?.cell}>
            {props.getValue() ? 'Active' : 'Inactive'}
          </div>
        ),
        enableSorting: col.enableSorting || false,
        enableHiding: col.enableHiding || false,
      })
    } else {
      rows.push({
        accessorKey: col.key,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={col.title}
            className={col.style?.header || ''}
          />
        ),
        cell: ({ row }) => (
          <div style={col.style?.cell}>{row.original[col.key]}</div>
        ),
        enableSorting: col.enableSorting || false,
        enableHiding: col.enableHiding || false,
      })
    }
  })

  if (actions)
    rows.push({
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
      cell: ({ row }) => <ActionComponent id={row.original.id as number} />,
    })

  return rows
}
