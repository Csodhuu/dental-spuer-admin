"use client";
import ButtonWithAdornment from "@/components/form-elements/button-with-adornment";
import { PlusCircle } from "lucide-react";

export default function UserFilters({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex justify-end items-center">
      <ButtonWithAdornment
        onClick={onAdd}
        label="Шинэ хэрэглэгч нэмэх"
        startAdornment={<PlusCircle />}
      />
    </div>
  );
}
