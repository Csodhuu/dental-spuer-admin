/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/data-table";
import { DeleteDialog } from "@/components/delete-dialog";
import { useState } from "react";
import { useDeleteHospital } from "../../hook";
import { toast } from "sonner";

interface Props {
  data: any;
  isLoading: boolean;
}

export default function HospitalList({ data, isLoading }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState<any | null>(null);

  const { mutate: deleteHospital } = useDeleteHospital({
    onSuccess: () => setDeleteDialogOpen(false),
  });

  const handleSubmit = () => {
    if (!deletedItem) return;
    toast.promise(
      new Promise<void>((resolve, reject) => {
        deleteHospital(deletedItem._id, {
          onSuccess: () => {
            setDeleteDialogOpen(false);
            setDeletedItem(null);
            resolve();
          },
          onError: (err) => {
            reject(err);
          },
        });
      }),
      {
        loading: "Устгаж байна...",
        success: "Амжилттай устгалаа!",
        error: "Устгах үед алдаа гарлаа. Дахин оролдоно уу.",
      }
    );
  };
  return (
    <>
      <DataTable
        title="hospital"
        description="hospitals"
        items={data ?? []}
        onDelete={(item) => {
          setDeleteDialogOpen(true);
          setDeletedItem(item);
        }}
        columns={[
          {
            label: "Нэр",
            accessor: "name",
          },
          {
            label: "Регистерын дугаар",
            accessor: "registrationNumber",
          },
          {
            label: "Хаяг",
            accessor: "address",
          },
          {
            label: "Утасны дугаар",
            accessor: "phoneNumber",
          },
        ]}
        isLoading={isLoading}
      />
      <DeleteDialog
        onConfirm={handleSubmit}
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setDeletedItem(null);
        }}
        title="Анхааруулга"
        description="Та устгахдаа итгэлтэй байна уу?"
        cancelText="Болих"
        confirmText="Устгах"
      />
    </>
  );
}
