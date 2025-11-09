/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { DataTable } from "..";
import ColumnSelectorDialog from "../column-select-dialog";
type Column<T> = {
  id: string;
  label: string;
  accessor: keyof T | ((item: T, index: number) => React.ReactNode);
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
};

interface Props<T extends Record<string, any>> {
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

export default function DataTableWithColumnSelector<
  T extends Record<string, any>
>({
  columns,
  items,
  title,
  description,
  rowKey,
  onEdit,
  onDelete,
  emptyState,
  isLoading,
}: Props<T>) {
  const [selectedColumnIds, setSelectedColumnIds] = useState<string[]>(
    columns.map((col) => col.id)
  );

  const visibleColumns = columns.filter((col) =>
    selectedColumnIds.includes(col.id)
  );

  return (
    <div className="space-y-6 p-2">
      <div className="flex justify-between items-center">
        <div>
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <ColumnSelectorDialog
          allColumns={columns.map(({ id, label, sortable }) => ({
            id,
            label,
            sortable,
          }))}
          selectedIds={selectedColumnIds}
          onChange={setSelectedColumnIds}
        />
      </div>
      <DataTable
        columns={visibleColumns}
        items={items}
        rowKey={rowKey}
        onEdit={onEdit}
        onDelete={onDelete}
        emptyState={emptyState}
        isLoading={isLoading}
      />
    </div>
  );
}
