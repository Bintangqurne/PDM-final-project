"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Progress } from "@/components/ui/progress";
import { fetchHistory } from "@/redux/appSlice";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea
import { CiSearch } from "react-icons/ci";
import { Search } from "lucide-react";

export default function HistoryComponent() {
  const dispatch = useDispatch<AppDispatch>();

  // Mendapatkan status, error, dan data history dari Redux
  const { history, status, error } = useSelector((state: RootState) => state.appReducer);
  const dataHistory = history?.data; // Mengakses history.data

  React.useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  // State untuk filter berdasarkan name
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  // State untuk kolom yang ditampilkan
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    name: true,
    description: true,
    price: true,
  });
  

  // Kolom-kolom untuk tabel
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "No",
      cell: ({ row }) => {
        const index = row.index + 1; // Menampilkan nomor urut (index dimulai dari 0)
        return <div>{index}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // State untuk sorting
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: dataHistory,  // Menggunakan data history dari Redux
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility, // Menangani perubahan visibilitas kolom
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // State untuk loading progress
  const [progress, setProgress] = React.useState(13);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full px-10 pt-3">
      {status === "loading" && (
        <div className="h-screen flex justify-center items-center pl-56 pr-56">
          <Progress value={progress} />
        </div>
      )}

      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}

      {/* Filter Input untuk name */}
      <div className="pb-4 flex items-center">
        <div id="Filter Name" className="relative"> {/* Filter Name dengan relative positioning */}
          <Input
            placeholder="History..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm pl-10 rounded-[5px]"  // memberi padding ke kiri untuk memberi ruang pada ikon
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"> {/* Posisi ikon di dalam input */}
            <Search size={18} /> {/* Ukuran ikon search */}
          </span>
        </div>

        {/* Dropdown untuk memilih kolom yang ingin ditampilkan */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto bg-black">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Scroll Area untuk Table */}
      <div className="rounded-md border">
        <ScrollArea className="h-[440px]"> {/* Membungkus tabel dengan ScrollArea */}
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
