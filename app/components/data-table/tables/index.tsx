import React from 'react'
import { useNavigate } from '@remix-run/react'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Export, ExportProps } from '../components/export'
import { Import, ImportProps } from '../components/import'
import { DataTablePagination } from '../components/pagination'
import { SearchInput } from '../components/search-input'
import DataTable from '..'

import { Button } from '~/components/ui/button'

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchBy: string
  imports?: ImportProps
  exports?: ExportProps
}

function Table<Tdata, TValue>({
  columns,
  data,
  searchBy,
  imports,
  exports,
}: TableProps<Tdata, TValue>) {
  const navigate = useNavigate()
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <SearchInput table={table} colKey={searchBy} />

          {/* <SelectFilter
            options={[]}
            column={table.getColumn('status')}
            title="Status"
          /> */}
        </div>
        <div className="flex items-center space-x-2">
          {exports && <Export filename={exports.filename} api={exports.api} />}
          {imports && (
            <Import
              title={imports.title}
              api={imports.api}
              filetype={imports.filetype}
            />
          )}
          <Button onClick={() => navigate('new')}>Add New</Button>
        </div>
      </div>
      <DataTable table={table} />
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </>
  )
}

export default Table
