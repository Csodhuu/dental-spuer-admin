/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/data-table";
import { DeleteDialog } from "@/components/delete-dialog";
import { useState } from "react";

interface Props {
  data: any;
  isLoading: boolean;
}

export default function UsersList({ data, isLoading }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState<any | null>(null);

  const handleSubmit = () => {
    console.log(deletedItem);
  };
  return (
    <>
      <DataTable
        title="Users"
        description="users list"
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
            accessor: "phone",
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
