"use client";
import ButtonWithAdornment from "@/components/form-elements/button-with-adornment";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import HospitalList from "./components/hospital-list";
import HospitalDialog from "./components/hospital-dialog";
import { useState } from "react";
import { useGetHospital } from "./hook";

export default function HospitalsPage() {
  const [open, setOpen] = useState(false);
  const { data, isPending } = useGetHospital();
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ButtonWithAdornment
          label="add hospitals"
          endAdornment={<Plus />}
          onClick={() => setOpen(true)}
        />
      </div>
      <Card className="p-2">
        <HospitalList data={data} isLoading={isPending} />
      </Card>
      <HospitalDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
