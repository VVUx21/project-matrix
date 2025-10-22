import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="mb-4 flex smd:flex-row flex-col justify-between items-start gap-2 smd:items-center">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
          className="px-4 py-2 rounded-lg bg-[#24316990] backdrop-blur-sm text-[#7DF9FF] placeholder-[#7DF9FF]/50 border border-[#7DF9FF]/20 ring-1 ring-[#ffffff75] focus:outline-none focus:border-[#7DF9FF] focus:ring-[#7DF9FF]/50 transition-all"
        />
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="px-4 py-2 rounded-lg bg-[#24316990] backdrop-blur-sm text-[#7DF9FF] border border-[#7DF9FF]/20 ring-1 ring-[#ffffff75] focus:outline-none focus:border-[#7DF9FF] focus:ring-[#7DF9FF]/50 transition-all cursor-pointer"
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="bg-[#243169]">
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#5000FF]/30 shadow-xl ring-1 ring-[#ffffff75]">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-[#24316990] backdrop-blur-sm"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-bold text-[#7DF9FF] uppercase tracking-wider border-b border-[#5000FF]/30 cursor-pointer hover:bg-[#243169]/80 transition-all"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-4 h-4 opacity-50" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-[#000002]/90">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#5000FF]/20 transition-all duration-200 border-b border-[#5000FF]/20"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between text-[#7DF9FF]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 border-2 border-[#7DF9FF] rounded-lg font-semibold bg-[#24316990] backdrop-blur-sm ring-1 ring-[#ffffff75] hover:bg-[#243169] hover:shadow-lg hover:shadow-[#5000FF]/30 hover:scale-105 transition-all duration-300 disabled:opacity-30 disabled:hover:bg-[#24316990] disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 border-2 border-[#7DF9FF] rounded-lg font-semibold bg-[#24316990] backdrop-blur-sm ring-1 ring-[#ffffff75] hover:bg-[#243169] hover:shadow-lg hover:shadow-[#5000FF]/30 hover:scale-105 transition-all duration-300 disabled:opacity-30 disabled:hover:bg-[#24316990] disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 border-2 border-[#7DF9FF] rounded-lg font-semibold bg-[#24316990] backdrop-blur-sm ring-1 ring-[#ffffff75] hover:bg-[#243169] hover:shadow-lg hover:shadow-[#5000FF]/30 hover:scale-105 transition-all duration-300 disabled:opacity-30 disabled:hover:bg-[#24316990] disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 border-2 border-[#7DF9FF] rounded-lg font-semibold bg-[#24316990] backdrop-blur-sm ring-1 ring-[#ffffff75] hover:bg-[#243169] hover:shadow-lg hover:shadow-[#5000FF]/30 hover:scale-105 transition-all duration-300 disabled:opacity-30 disabled:hover:bg-[#24316990] disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {">>"}
          </button>
        </div>
        <span className="text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}
