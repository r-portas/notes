import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Notes",
  description: "A lightweight notes app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
