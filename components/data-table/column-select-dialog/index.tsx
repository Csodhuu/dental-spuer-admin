"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import ButtonWithAdornment from "@/components/form-elements/button-with-adornment";
import { Plus, Save, Table } from "lucide-react";

interface Column {
  id: string;
  label: string;
  sortable?: boolean;
}

interface Props {
  allColumns: Column[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function ColumnSelectorDialog({
  allColumns,
  selectedIds,
  onChange,
}: Props) {
  const [tempSelected, setTempSelected] = useState<string[]>(selectedIds);
  const [open, setOpen] = useState(false);

  const handleToggle = (id: string) => {
    if (tempSelected.includes(id)) {
      setTempSelected(tempSelected.filter((colId) => colId !== id));
    } else {
      setTempSelected([...tempSelected, id]);
    }
  };

  const handleSave = () => {
    onChange(tempSelected);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonWithAdornment
          label="Багануудыг сонгох"
          startAdornment={<Table className="h-4 w-4" />}
          endAdornment={<Plus className="h-4 w-4" />}
          size="sm"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Харагдах багануудыг сонгох</DialogTitle>
        </DialogHeader>
        <ScrollArea className="pr-2">
          {allColumns.map((col) => (
            <div
              key={col.id}
              className="flex items-center gap-2 py-1 cursor-pointer p-2 border border-gray-200 mb-3 rounded-md"
              onClick={() => handleToggle(col.id)}
            >
              <Checkbox checked={tempSelected.includes(col.id)} id={col.id} />
              {col.label}
            </div>
          ))}
        </ScrollArea>
        <DialogFooter>
          <ButtonWithAdornment
            label="Хадгалах"
            startAdornment={<Save className="h-4 w-4" />}
            className="bg-green-500 hover:bg-green-600 text-white px-2 flex items-center justify-center"
            onClick={handleSave}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
