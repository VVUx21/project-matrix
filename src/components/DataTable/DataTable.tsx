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
                    className="px-4 py-2 rounded-lg bg-[#003955]  text-[#acffff] placeholder-[#acffff]/50 focus:outline-none"
                />
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="px-4 py-2 rounded-lg bg-[#003955] text-[#acffff] focus:outline-none"
                >
                    {[10, 25, 50].map((pageSize) => (
                        <option
                            key={pageSize}
                            value={pageSize}
                            className="bg-[#003955]"
                        >
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#003955]">
                <table className="w-full border-collapse">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-[#003955]">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-[#acffff] uppercase tracking-wider border-b border-[#06111d] cursor-pointer hover:bg-[#003955]/80"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            </span>
                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() ===
                                                "asc" ? (
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
                    <tbody className="bg-[#06111d]">
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-[#003955]/10 transition-colors border-b border-[#003955]"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-[#acffff]"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-[#acffff]">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border border-[#acffff] rounded hover:bg-[#003955] disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                        {"<<"}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border border-[#acffff] rounded hover:bg-[#003955] disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border border-[#acffff] rounded hover:bg-[#003955] disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                        {">"}
                    </button>
                    <button
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border border-[#acffff] rounded hover:bg-[#003955] disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                        {">>"}
                    </button>
                </div>
                <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </span>
            </div>
        </div>
    );
}
