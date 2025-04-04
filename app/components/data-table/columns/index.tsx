import { ReactNode } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Check, X } from 'lucide-react'

import { ActionComponent } from '../components/action'
import { DataTableColumnHeader } from '../components/header'
import { HeaderSelector, RowSelector } from '../components/row-selection'
import { UDComponent } from '../components/update-delete-action'

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

export function customColumns<
  T extends Record<string, ReactNode | { [key: string]: ReactNode }>,
>(
  cols: Columns[],
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  setRemove?: (id: number) => void,
  setData?: (
    data: Record<string, React.ReactNode | { [key: string]: React.ReactNode }>
  ) => void
): ColumnDef<T>[] {
  const rows: ColumnDef<T>[] = []

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
    } else if (col.title === 'Action') {
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
        cell: ({ row }) => (
          <UDComponent
            id={row.original[col.key] as number}
            setOpen={setOpen!}
            setRemove={setRemove!}
            setData={setData!}
            data={row.original}
          />
        ),
      })
    } else if (col.key.includes('.')) {
      const [parent, child] = col.key.split('.')
      rows.push({
        accessorKey: col.key,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={col.title}
            className={col.style?.header || ''}
          />
        ),
        cell: ({ row }) => {
          const parentValue = row.original[parent]

          return (
            <div style={col.style?.cell}>
              {typeof parentValue === 'object' && parentValue !== null
                ? (parentValue as Record<string, ReactNode>)[child]
                : ''}
            </div>
          )
        },
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
          <div style={col.style?.cell}>
            {typeof row.original[col.key] === 'boolean' ? (
              row.original[col.key] ? (
                <Check />
              ) : (
                <X />
              )
            ) : (
              (row.original[col.key] as ReactNode)
            )}
          </div>
        ),
        enableSorting: col.enableSorting || false,
        enableHiding: col.enableHiding || false,
      })
    }
  })

  return rows
}
