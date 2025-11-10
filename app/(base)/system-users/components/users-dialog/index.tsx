"use client";

import { useGetHospital } from "@/app/(base)/hospitals/hook";
import {
  InputFieldRHF,
  SelectFieldRHF,
  SwitchFieldRHF,
} from "@/components/fields";
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
import { CreateUserInput, useCreateUser } from "../../hook";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const schema = z.object({
  firstName: z.string().min(1, "Нэр шаардлагатай"),
  lastName: z.string().min(1, "Овог шаардлагатай"),
  isSuperAdmin: z.boolean().default(false),
  phoneNumber: z.string().regex(/^(?:\d{8}|\d{8})$/, "Утасны дугаар буруу"),
  username: z.string().min(4, "Username хамгийн багадаа 4 тэмдэгт"),
  password: z.string().min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт"),
  hospitalId: z.string().min(1, "Эмнэлэг сонгоно уу"),
});

type FormValues = z.infer<typeof schema>;

export default function UsersDialog({ open, onOpenChange }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      isSuperAdmin: false,
      phoneNumber: "",
      username: "",
      password: "",
      hospitalId: "",
    },
  });

  const { data: hospitals = [], isPending: hospitalsLoading } =
    useGetHospital();

  //   const { mutate: createUser, isPending } = useCreateUser({
  //     onSuccess: () => {
  //       form.reset();
  //       onOpenChange(false);
  //     },
  //   });

  const onSubmit = (values: FormValues) => {
    console.log(values);
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
          <DialogTitle className="text-lg font-medium">Create User</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <InputFieldRHF<FormValues>
                control={form.control}
                name="firstName"
                label="First name"
                placeholder="Bat"
                required
              />
              <InputFieldRHF<FormValues>
                control={form.control}
                name="lastName"
                label="Last name"
                placeholder="Erdene"
                required
              />

              <SwitchFieldRHF<FormValues>
                control={form.control}
                name="isSuperAdmin"
                label="Super Admin"
              />

              <InputFieldRHF<FormValues>
                control={form.control}
                name="phoneNumber"
                label="Phone number"
                placeholder="+976XXXXXXXX"
                required
              />
              <InputFieldRHF<FormValues>
                control={form.control}
                name="username"
                label="Username"
                placeholder="admin01"
                required
              />
              <InputFieldRHF<FormValues>
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="••••••"
                required
              />

              <SelectFieldRHF<FormValues>
                control={form.control}
                name="hospitalId"
                label="Hospital"
                placeholder={
                  hospitalsLoading ? "Loading..." : "Select hospital"
                }
                options={hospitals.map((h: any) => ({
                  label: `${h.name} (${h.registrationNumber})`,
                  value: h._id,
                }))}
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
              />
              <ButtonWithAdornment startAdornment={<Save />} type="submit" />
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
