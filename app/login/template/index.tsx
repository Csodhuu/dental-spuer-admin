"use client";

import LeftSide from "../components/left-side";
import RightSide from "../components/right-side";

import { Toaster } from "sonner";

export default function LoginClient() {
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <LeftSide />
        <RightSide />
      </div>
      <Toaster richColors position="top-center" />
    </>
  );
}
