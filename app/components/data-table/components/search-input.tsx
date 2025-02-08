import { Table } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

interface SearchInputProps<TData> {
  table: Table<TData>
  colKey: string
}

export function SearchInput<TData>({ table, colKey }: SearchInputProps<TData>) {
  return (
    <div className="flex items-center border-2 rounded-lg pl-2 min-w-sm max-w-sm bg-transparent">
      <Search className="w-5 h-5 text-muted-foreground" />
      <Input
        placeholder="Search..."
        value={(table.getColumn(colKey)?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn(colKey)?.setFilterValue(event.target.value)
        }
        className="focus-visible:ring-0 border-none focus-visible:ring-offset-0 w-full bg-transparent"
      />
      <Button
        variant={'link'}
        disabled={!table.getColumn(colKey)?.getFilterValue()}
        onClick={() => table.getColumn(colKey)?.setFilterValue('')}
      >
        {(table.getColumn(colKey)?.getFilterValue() as string) && (
          <X className="w-6 h-6 text-muted-foreground" />
        )}
      </Button>
    </div>
  )
}
