"use client";

import { Shield } from "lucide-react";

export default function LeftSide() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 p-12 text-white items-center justify-center">
      <div className="max-w-md">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-10 w-10" />
          <h1 className="text-3xl font-bold">Super Admin</h1>
        </div>
      </div>
    </div>
  );
}
