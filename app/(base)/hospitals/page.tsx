import ButtonWithAdornment from "@/components/form-elements/button-with-adornment";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import HospitalList from "./components/hospital-list";

export default function HospitalsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ButtonWithAdornment label="add hospitals" endAdornment={<Plus />} />
      </div>
      <Card className="p-2">
        <HospitalList data={[]} isLoading={false} />
      </Card>
    </div>
  );
}
