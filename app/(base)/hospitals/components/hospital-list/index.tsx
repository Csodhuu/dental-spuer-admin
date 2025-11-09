/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/data-table";

interface Props {
  data: any;
  isLoading: boolean;
}

export default function HospitalList({ data, isLoading }: Props) {
  return (
    <>
      <DataTable
        title="hospital"
        description="hospitals"
        items={data ?? []}
        columns={[
          {
            label: "Овог",
            accessor: "ovog",
          },
          {
            label: "Нэр",
            accessor: "ner",
          },
          {
            label: "Регистерын дугаар",
            accessor: "register",
          },
          {
            label: "Утасны дугаар",
            accessor: "utasniiDugaar",
          },
        ]}
        isLoading={isLoading}
      />
    </>
  );
}
