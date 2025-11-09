"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Loading from "../loading";

export default function WithAuthClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = typeof window !== "undefined" ? getCookie("accessToken") : null;

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [router, token]);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
}
