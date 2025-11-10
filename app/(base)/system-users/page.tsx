"use client";

import { Card } from "@/components/ui/card";
import UsersList from "./components/users-list";
import UserFilters from "./components/user-filter";

export default function SystemUsers() {
  return (
    <div className="space-y-4">
      <UserFilters onAdd={() => {}} />
      <Card className="p-2">
        <UsersList data={[]} isLoading={false} />
      </Card>
    </div>
  );
}
