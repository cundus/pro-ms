import React from 'react'
import { useNavigate } from '@remix-run/react'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTablePagination } from '../components/pagination'
import { SearchInput } from '../components/search-input'
import DataTable from '..'

import { Button } from '~/components/ui/button'

interface CompanyDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function CompanyDataTable<Tdata, TValue>({
  columns,
  data,
}: CompanyDataTableProps<Tdata, TValue>) {
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
          <SearchInput table={table} colKey="name" />

          {/* <SelectFilter
            options={[]}
            column={table.getColumn('status')}
            title="Status"
          /> */}
        </div>
        <Button onClick={() => navigate('new')}>Add New</Button>
      </div>
      <DataTable table={table} />
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </>
  )
}

export default CompanyDataTable
