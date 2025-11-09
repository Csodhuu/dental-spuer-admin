/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Loading from "../loading";

type Column<T> = {
  label: string;
  accessor: keyof T | ((item: T, index: number) => React.ReactNode);
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
};

interface DataTableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  items: T[];
  title?: string;
  description?: string;
  rowKey?: (item: T, index: number) => string | number;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
}

export const DataTable = <T extends Record<string, any>>({
  columns,
  items,
  title,
  description,
  rowKey = (item, index) => item.id ?? index,
  onEdit,
  onDelete,
  emptyState = <span>Хоосон байна.</span>,
  isLoading = false,
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const sortedItems = sortColumn
    ? [...items].sort((a, b) => {
        const aVal = a[sortColumn as keyof T];
        const bVal = b[sortColumn as keyof T];
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
        return 0;
      })
    : items;

  const handleSort = (col: Column<T>) => {
    if (typeof col.accessor === "function") return;
    const key = col.accessor as string;
    if (sortColumn === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="w-full space-y-4">
      {(title || description) && (
        <div className="space-y-1 pl-4">
          {title && <p className="text-md font-semibold">{title}</p>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-md border">
        <Table className="relative min-w-[800px]">
          <TableHeader className="sticky top-0 z-30 bg-background shadow-sm">
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    "px-4 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.width && `min-w-[${col.width}]`
                  )}
                  onClick={() => col.sortable && handleSort(col)}
                >
                  {col.label}
                  {sortColumn === col.accessor && (
                    <span>{sortAsc ? " ↑" : " ↓"}</span>
                  )}
                </TableHead>
              ))}
              {(onEdit || onDelete) && (
                <TableHead className="sticky right-0 px-4 py-3 text-right bg-background z-30 shadow-left min-w-[100px]">
                  Үйлдэл
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="h-24 text-center text-sm text-muted-foreground p-5"
                >
                  <Loading />
                </TableCell>
              </TableRow>
            ) : sortedItems?.length > 0 ? (
              sortedItems.map((item, index) => (
                <TableRow
                  key={rowKey(item, index)}
                  className={index % 2 === 0 ? "bg-muted/40" : ""}
                >
                  {columns.map((col, idx) => (
                    <TableCell
                      key={idx}
                      className={cn(
                        "px-4 py-3 text-[13px] whitespace-nowrap",
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right"
                      )}
                    >
                      {typeof col.accessor === "function"
                        ? col.accessor(item, index)
                        : item[col.accessor] ?? "-"}
                    </TableCell>
                  ))}

                  {(onEdit || onDelete) && (
                    <TableCell className="sticky right-0 z-20 bg-white px-2 py-3 text-right text-[13px] min-w-[100px]">
                      <div className="flex justify-end gap-2">
                        {onEdit && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(item)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Засах</TooltipContent>
                          </Tooltip>
                        )}
                        {onDelete && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(item)}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Устгах</TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground text-sm"
                >
                  {emptyState}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
