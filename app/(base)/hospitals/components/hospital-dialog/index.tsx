"use client";

import { InputFieldRHF } from "@/components/fields";
import ButtonWithAdornment from "@/components/form-elements/button-with-adornment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateHospital } from "../../hook";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const schema = z.object({
  name: z.string().min(2, "Нэр хамгийн багадаа 2 тэмдэгт"),
  registrationNumber: z
    .string()
    .regex(/^\d{7}$/, "РД 7 оронтой тоо байх ёстой"),
  address: z.string().min(3, "Хаяг хамгийн багадаа 3 тэмдэгт"),
  phone: z
    .string()
    .regex(/^(?:\+976\d{8}|\d{8})$/, "Утасны дугаар буруу байна"),
  logo: z.string().url("Зөв URL оруулна уу"),
});

type FormValues = z.infer<typeof schema>;

export default function HospitalDialog({ open, onOpenChange }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Smile Dental Clinic",
      registrationNumber: "1234567",
      address: "Peace Avenue, Ulaanbaatar",
      phone: "+97699998888",
      logo: "https://example.com/logo.png",
    },
  });

  const { mutate: createCustomer, isPending } = useCreateHospital({
    onSuccess: () => {
      onOpenChange(false);
      form.reset();
    },
  });

  const onSubmit = async (values: FormValues) => {
    createCustomer(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) form.reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className="overflow-y-auto max-w-md">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-medium">
            Hospital dialog
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <InputFieldRHF
                control={form.control}
                name="name"
                label="Name"
                placeholder="Clinic name"
                required
              />
              <InputFieldRHF
                control={form.control}
                name="registrationNumber"
                label="Registration Number"
                placeholder="1234567"
                required
              />
              <InputFieldRHF
                control={form.control}
                name="address"
                label="Address"
                placeholder="Peace Avenue, Ulaanbaatar"
                required
              />
              <InputFieldRHF
                control={form.control}
                name="phone"
                label="Phone"
                placeholder="+976XXXXXXXX"
                required
              />
              <InputFieldRHF
                control={form.control}
                name="logo"
                label="Logo URL"
                placeholder="https://example.com/logo.png"
                required
              />
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <ButtonWithAdornment
                startAdornment={<X />}
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                label="Болих"
                disabled={isPending}
              />
              <ButtonWithAdornment
                startAdornment={<Save />}
                type="submit"
                label={isPending ? "Хадгалж байна..." : "Хадгалах"}
                disabled={isPending}
              />
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
