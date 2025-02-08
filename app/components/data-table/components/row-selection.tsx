import { Row, Table } from '@tanstack/react-table'

import { Checkbox } from '~/components/ui/checkbox'

interface HeaderSelectionProps<T> {
  table: Table<T>
}

export function HeaderSelector<T>({ table }: HeaderSelectionProps<T>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  )
}

export function RowSelector<T>({ row }: { row: Row<T> }) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  )
}
