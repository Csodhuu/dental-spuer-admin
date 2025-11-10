"use client";

import { Card } from "@/components/ui/card";
import UsersList from "./components/users-list";
import UserFilters from "./components/user-filter";
import { useState } from "react";
import UsersDialog from "./components/users-dialog";

export default function SystemUsers() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <UserFilters
        onAdd={() => {
          setOpen(true);
        }}
      />
      <UsersDialog onOpenChange={setOpen} open={open} />
      <Card className="p-2">
        <UsersList data={[]} isLoading={false} />
      </Card>
    </div>
  );
}
