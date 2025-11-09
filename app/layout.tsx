import "./globals.css";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import AuthSessionProvider from "@/components/auth/session-provider";
import QueryProvider from "@/components/providers/query-provider";
import Loading from "@/components/loading";

export const metadata: Metadata = {
  title: "E-Dental",
  description: "Your app description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body>
        <QueryProvider>
          <AuthSessionProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </AuthSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
