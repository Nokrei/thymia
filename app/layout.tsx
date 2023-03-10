"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import { GlobalProvider } from "@/context/AppContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <UserAndGameProvider>
          {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
          <head />

          <body className=" bg-slate-900">
            <Header />
            <div className=" max-w-lg m-auto">{children}</div>
          </body>
        </UserAndGameProvider>
      </QueryClientProvider>
    </html>
  );
}
